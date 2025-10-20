import { type JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';

export function FloorModel(props: JSX.IntrinsicElements['mesh']) {
  const gltf = useLoader(GLTFLoader, '/floor.glb');
  const model = gltf.scene;

  model.traverse(child => {
    // @ts-ignore
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // ⚙️ Adjust material reflectivity
      // @ts-ignore
      // if (child.material) {
      //   // @ts-ignore
      //   child.material.metalness = 1.0;
      //   // @ts-ignore
      //   child.material.roughness = 0.15;

      //   // ✅ Apply texture scale / offset / rotation if texture exists
      //   const maps = [
      //     'map',
      //     'normalMap',
      //     'roughnessMap',
      //     'metalnessMap',
      //     'emissiveMap',
      //   ];
      //   for (const mapType of maps) {
      //     // @ts-ignore
      //     const tex = child.material[mapType];
      //     if (tex) {
      //       tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

      //       // === ✨ Modify texture settings here ===
      //       tex.repeat.set(2, 2); // tiling amount (increase = smaller tiles)
      //       tex.offset.set(0.1, 0.1); // texture shift
      //       tex.rotation = Math.PI / 8; // rotate 22.5 degrees
      //       tex.center.set(0.5, 0.5); // rotate around center
      //     }
      //   }
      // }
    }
  });

  return (
    <>
      <primitive scale={5} object={model} {...props} />
    </>
  );
}

useGLTF.preload('/floor.glb');
