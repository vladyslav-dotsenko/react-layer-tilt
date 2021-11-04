# React Layer Tilt

React components for creating tilting layers visual effect. [Check live demo](https://vladyslav-dotsenko.github.io/react-layer-tilt/) to see how it looks.

## Concept

Define Tilt zone and Tilt layers in declarative way with react components.
Keep all layers in sync with a single controller at tilt zone.

Single responsibility for Tilt and TiltLayer components,\
compose them with other components in any desirable way. 

## Usage

```
import { Tilt, TiltLayer } from './lib/tilt'

const Demo = () => (
  <Tilt>
    <TiltLayer distance={1}>
      <h1>Hello</h1>
    </TiltLayer>
    <TiltLayer distance={2}>
      <h1>World</h1>
    </TiltLayer>
  </Tilt>
)

```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
