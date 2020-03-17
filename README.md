# React Native Gallery

A showcase/learning app that recreates a minimal photo gallery with basic functionalities.

## Requirements

The project requires the [expo cli](https://docs.expo.io/versions/v36.0.0/) installed globally. To install it, run:

```bash
npm install -g expo-cli
```

Afterwards run `yarn install`.

## Development

To spin up the development environment, simply run `npm start`.

Linting of src files can be performed by running `npm run lint:ts`.

Format check of files can be done by running:

```bash
npm run format
npm run format -- --write
```

## Deploy

### Build with expo

The [expo deploy docs](https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/) explain some of the steps required to build the application.

To build the application, run the following:

```bash
expo build:ios
expo build:android
```

Most likely you will be prompted to complete some steps before continuing with the build.

Notice that this will run the build task on the expo servers.

### Build with turtle-cli

The [standalone build docs](https://docs.expo.io/versions/latest/distribution/turtle-cli/) explain some of the
requirements for building application on CI or a private computer.
