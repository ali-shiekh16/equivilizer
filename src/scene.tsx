import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { useControls } from 'leva';
import Track from './components/track';

const Test = () => {

  const bloomControls = useControls('Bloom', {
    intensity: { value: 0.9, min: 0, max: 2, step: 0.1 },
    // kernelSize: { value: 3, min: 1, max: 5, step: 1 },
    // luminanceThreshold: { value: 0.05, min: 0, max: 1, step: 0.01 },
    luminanceSmoothing: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
  });


  return (
    <Canvas
    // gl={{
    //   antialias: true,
    // }}
    >
      {/* <Environment preset='studio' /> */}
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <group position={[0, 0, 2]}>
              <Track url={'/song.mp3'} color={'#ff5be9'} />
      </group>

      <ambientLight intensity={0.3} />

      <EffectComposer multisampling={8} enableNormalPass={false}>
        <ToneMapping />
        <Bloom
          intensity={bloomControls.intensity}
          kernelSize={1}
          luminanceThreshold={0}
          luminanceSmoothing={bloomControls.luminanceSmoothing}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Test;
