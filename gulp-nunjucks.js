const { src, dest, watch } = require('gulp');
const {
  notifyPipeError,
  normalizeOpts,
  prefixGlobs,
  gulpReplace,
} = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'nunjucks', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: ['*.htm'], // which files to use as entry points
  // ext: '', // Defaults to the same extension as the entry file
  // data: {}, // Static data/variables to inject into the global-scope
  // getData: null, // () => object // Dynanic data builder
  // manageEnv: null, // (env: NujucksEnvironment) => void
      // see: https://mozilla.github.io/nunjucks/api.html#environment
};

const nunjucksRender = require('gulp-nunjucks-render');

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), { base: opts.src })
      .pipe(notifyPipeError())
      .pipe(
        nunjucksRender({
          path: opts.src,
          data: (opts.getData ? opts.getData() : opts.data) || {},
          ext: opts.ext,
          inheritExtension: !opts.ext,
          manageEnv: opts.manageEnv,
        })
      )
      .pipe(gulpReplace(/^[\s*\n]+/, '')) // remove macro/config induced whitespace at start of file.
      .pipe(dest(opts.dist));
  };
  bundleTask.displayName = opts.name;

  const watchTask = () => {
    watch(prefixGlobs(opts.glob, opts.src), bundleTask);
  };
  watchTask.displayName = opts.name + '_watch';

  const ret = [bundleTask, watchTask];
  ret.bundle = bundleTask;
  ret.watch = watchTask;

  return ret;
};
