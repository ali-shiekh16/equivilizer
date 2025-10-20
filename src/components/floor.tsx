// src/components/ReflectiveFloor.tsx

import { MeshReflectorMaterial, useTexture } from '@react-three/drei';

interface FloorProps {
  roughness?: number;
  metalness?: number;
  mixStrength?: number;
  blur?: [number, number];
}

export function Floor({
  roughness = 1,
  metalness = 0.5,
  mixStrength = 20,
  blur = [300, 100],
}: FloorProps) {
  const [normal, roughnessMap] = useTexture([
    '/texture/floor-normal.jpeg',
    '/texture/floor-roughness.jpeg',
    // '/texture/floor-color.jpeg',
  ]);

  return (
    <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        roughnessMap={roughnessMap}
        // map={colorMap}
        normalMap={normal}
        // normalScale={20}
        // displacementScale={50}
        // displacementBias={5}
        blur={blur}
        resolution={2048}
        mixBlur={1}
        mixStrength={mixStrength}
        roughness={roughness}
        depthScale={1.5}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color='#111'
        metalness={metalness}
      />
    </mesh>
  );
}
