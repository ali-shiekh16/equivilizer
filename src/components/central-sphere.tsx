import { type JSX } from 'react';

import { useTexture } from '@react-three/drei';

const CentralSphere = (
  props: JSX.IntrinsicElements['group'] & {
    color?: string;
  }
) => {
  // const orbitRef1 = useRef<THREE.Mesh>(null);
  // const orbitRef2 = useRef<THREE.Mesh>(null);
  // const orbitRef3 = useRef<THREE.Mesh>(null);

  // useFrame(() => {
  //   const rotationSpeed = 0.01;
  //   if (orbitRef1.current) orbitRef1.current.rotation.z += rotationSpeed;
  //   if (orbitRef2.current) orbitRef2.current.rotation.z += rotationSpeed;
  //   if (orbitRef3.current) orbitRef3.current.rotation.z += rotationSpeed;
  // });

  const [emissive] = useTexture(['/texture/sphere-emissive.jpeg']);

  return (
    <group {...props}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={'#000'} />
      </mesh>

      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          emissiveMap={emissive}
          emissive={props.color ? props.color : '#41e620'}
          emissiveIntensity={10}
          // emissiveIntensity={20}
          alphaMap={emissive}
          transparent={true}
          color={props.color || '#41e620'}
          // metalness={0.5}
          // roughness={0.8}
        />
      </mesh>
    </group>
  );
};

export default CentralSphere;
