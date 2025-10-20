import { FloorModel } from './components/floor-model';
import Track from './components/track';

const TestBox = () => {
  return (
    <group position={[0, 0, 2]}>
      <Track
        color={'#ff0000'}
        width={0.03}
        height={0.05}
        space={1.1}
        url='/song.mp3'
      />
      {/* <RectAreaLightWithHelper
        showHelper
        color={'#ff0000'}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
        intensity={1}
      /> */}
      <FloorModel scale={25} />
    </group>
  );
};

export default TestBox;
