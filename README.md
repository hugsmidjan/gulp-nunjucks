# @hugsmidjan/gulp-nunjucks

```
npm install --save-dev @hugsmidjan/gulp-nunjucks
```

## Usage

```js
const [cssBundle, cssWatch] = require('@hugsmidjan/gulp-nunjucks')(opts);
```

## API / Advanced usage

```js
const nunjucksTaskFactory = require('@hugsmidjan/gulp-nunjucks');

const options = {
  // These are the defaults:
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

// Create the gulp tasks based on the above options.
const nunjucksTasks = nunjucksTaskFactory(options);

// nunjucksTasks is a two item array...
const [nunjucksBundle, nunjucksWatch] = nunjucksTasks;
// ...but it also exposes the tasks as named properties.
const { bundle, watch } = nunjucksTasks;
```

