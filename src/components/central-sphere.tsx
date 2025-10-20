// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

import { useTexture } from '@react-three/drei';

const CentralSphere = () => {
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
    <group position={[0, 0.1, 0]}>
      {/* Three orbital patches */}
      {/* <mesh ref={orbitRef1} position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.22, 0.005, 2, 21, Math.PI / 3]} />
        <meshStandardMaterial color='#ff0' metalness={0.0} roughness={0.8} />
      </mesh>
      <mesh
        ref={orbitRef2}
        position={[0, 0.2, 0]}
        rotation={[0, 0, (Math.PI * 2) / 3]}
      >
        <torusGeometry args={[0.22, 0.005, 2, 21, Math.PI / 3]} />
        <meshStandardMaterial color='#ff0' metalness={0.0} roughness={0.8} />
      </mesh>
      <mesh
        ref={orbitRef3}
        position={[0, 0.2, 0]}
        rotation={[0, 0, (Math.PI * 4) / 3]}
      >
        <torusGeometry args={[0.22, 0.005, 2, 21, Math.PI / 3]} />
        <meshStandardMaterial color='#ff0' metalness={0.0} roughness={0.8} />
      </mesh> */}

      {/* Main sphere */}
      {/* <pointLight color='#f00' intensity={10} position={[0, 0.2, 0]} /> */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          emissiveMap={emissive}
          // emissiveIntensity={20}
          alphaMap={emissive}
          transparent={true}
          color='#f00'
          // metalness={0.5}
          // roughness={0.8}
        />
      </mesh>
    </group>
  );
};

export default CentralSphere;
