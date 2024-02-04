![Rocket](https://img.freepik.com/premium-vector/rocket-doodle-space-sketch-cartoon_507816-294.jpg)

# ¡Space·Rockets! app

I have created a favoriting system for a SpaceX frontend

I have uploaded the build to Netlify, which you can find here:

### [🚀 See the app in action 🚀](https://nikecow-spacerockets.netlify.app)

## Develop

> You'll need [Node >=16](https://nodejs.org/en/) and
> [Yarn v1](https://classic.yarnpkg.com/en/) installed

-   run `yarn` to install dependencies
-   run `yarn start` to start development environment

## Build

> You'll need [Node >=16](https://nodejs.org/en/) and
> [Yarn v1](https://classic.yarnpkg.com/en/) installed

-   run `yarn` to install dependencies
-   run `yarn build` to build app for production
-   output is in `build` directory,
    [ready to be deployed](https://create-react-app.dev/docs/deployment/)

## Data

All data is fetched from the unofficial SpaceX API V3 at
[spacexdata.com](https://docs.spacexdata.com/?version=latest).

## Technologies

> This project was bootstrapped with
> [Create React App](https://github.com/facebook/create-react-app). You can
> learn more in the
> [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

-   [React](https://reactjs.org) - UI library
-   [Chakra UI](https://chakra-ui.com) - Design system and component library, with
    [Emotion](https://emotion.sh), its peer dependency
-   [SWR](https://swr.vercel.app) - Data fetching and caching library
-   [React Router](https://reactrouter.com/docs/en/v6) - routing library
-   [React Feathers](https://github.com/feathericons/react-feather) - Icons
    ([Feather icons](https://feathericons.com/) wrapper for React)
-   [timeago.js](https://timeago.org/) - Tiny library to display human-readable
    relative time difference
-   [Typescript](https://www.typescriptlang.org) - Javascript with syntax for types
-   [ESLint](https://eslint.org) - Linting rules for Javascript code
-   [Prettier](https://prettier.io) - Automated code formatter

## Code style and formatting

Prettier is used for code styling and ESLint is used to ensure code quality.

Both Prettier and ESLint are invoked on pre-commit with a hook on _staged files only_ (see the `lint-staged` section in the package.json file). Don't forget to enable `git hooks` on commit.

You can also manually invoke these tools with the following commands:

-   run `yarn prettify` to prettify the codebase
-   run `yarn lint:check` to check the code with ESLint
-   run `yarn lint:fix` to check the code and automatically try to fix any errors

See `.eslintrc.js` and `.prettierrc.json` files for the settings.

Running Prettier and ESLint on save actions is disabled by default. Enabling it depends on your IDE.

#### Visual Studio Code:

1. Install the ESLint and Prettier extensions.
2. Go to your preferences
3. Settings -> Select "User" tab -> Text Editor -> Formatting -> Select "Format On Save"

#### IntelliJ:

1. Install the Prettier plugin.
2. In the "ESLint" configuration enable "Automatic ESLint configuration" and "Run eslint --fix on save".
3. In the Prettier configuration panel enable "On Reformat Code action" and "On save"
