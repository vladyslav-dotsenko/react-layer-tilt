import { Tilt, TiltLayer } from './lib/tilt'

const getRandomArbitrary = (min, max) =>
  min + Math.floor(Math.random() * max)

const Image = ({ src }) => (
  <img
    alt="some-cutenes"
    src={src}
    style={{
      width: '100%',
      height: '100%',
      onjectFit: 'cover',
    }}
  />
)

const Circle = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: '120px',
      height: '120px',
      borderRadius: '50%',
    }}
  />
)

const Center = ({ children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
)

const BottomSlot = ({ children }) => (
  <div
    style={{
      width: '100%',
      height: '100px',
      position: 'absolute',
      bottom: '5%',
    }}
  >
    {children}
  </div>
)

const hslColorIteration = (colorTone, step) => index =>
  `hsl(${colorTone}, 100%, ${50 + step * index}%`

const Demo = () => {
  const colorTone = getRandomArbitrary(0, 360)
  const hslColors = [0, 2, 4, 6, 8]
    .map(hslColorIteration(colorTone, 5))

  return (
    <Tilt>
      {hslColors.map((color, index) => (
        <TiltLayer distance={index * 3} key={color} debug={index === 1}>
          <Center>
            <Circle color={color} />
          </Center>
        </TiltLayer>
      ))}
      <TiltLayer noZoom distance={12}>
        <BottomSlot>
          <Center>
            <h3>Tilt your phone to see effect</h3>
          </Center>
        </BottomSlot>
      </TiltLayer>
    </Tilt>
  );
}

export default Demo
