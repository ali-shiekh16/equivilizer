import { Environment, OrbitControls } from '@react-three/drei';
import CentralSphere from './components/central-sphere';
import { FloorModel } from './components/floor-model';
import { Canvas } from '@react-three/fiber';
const Scene = () => {
  return (
    <Canvas
      // shadows='soft'
      // dpr={[2, 4]}
      // gl={{
      //   antialias: true,
      //   alpha: false,
      //   powerPreference: 'high-performance',
      //   toneMapping: THREE.ACESFilmicToneMapping,
      //   toneMappingExposure: 1.2,
      // }}
      camera={{
        position: [0, 0.4, 2.7],
        fov: 25,
      }}
    >
      <Environment preset='studio' environmentIntensity={1} />
      {/* <Suspense fallback={null}>
        <Track
          color={color}
          width={0.03}
          height={0.05}
          space={1.1}
          url='/song.mp3'
        />
      </Suspense> */}
      {/* <RectAreaLightWithHelper
        showHelper
        color={'#ff0000'}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 3, 0]}
        intensity={1}
      /> */}
      {/* <Floor
        roughness={1}
        metalness={floorControls.metalness}
        mixStrength={floorControls.mixStrength}
        blur={floorControls.blur}
      /> */}

      <CentralSphere />

      <FloorModel />
      {/* <color attach='background' args={['#000']} /> */}
      {/* <fogExp2 attach='fog' args={['#000', 0.1]} /> */}

      <ambientLight intensity={1} />

      {/* <EffectComposer multisampling={8} enableNormalPass={false}>
        <ToneMapping />
        <Bloom
          intensity={bloomControls.intensity}
          kernelSize={1}
          luminanceThreshold={0}
          luminanceSmoothing={bloomControls.luminanceSmoothing}
          mipmapBlur
        />
      </EffectComposer> */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
