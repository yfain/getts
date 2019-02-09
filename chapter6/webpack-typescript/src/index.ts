import chalk from 'chalk'; // instead of `import * as chalk from 'chalk'` because chalk explicitly exposes a default export.

const message: string = 'Bundled by the Webpack';

console.log(chalk.black.bgGreenBright(message));
