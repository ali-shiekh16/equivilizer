import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraShakeProps {
  intensity?: number;
}

export function CameraShake({ intensity = 0.05 }: CameraShakeProps) {
  const { camera } = useThree();
  const originalPosition = useRef(new THREE.Vector3(0, 0.4, 2.7));
  const shakeIntensity = useRef(0);

  useFrame(state => {
    // Simple periodic shake for demo - in a real implementation,
    // you'd pass beat data from the audio analysis
    const time = state.clock.getElapsedTime();
    const beatInterval = 0.5; // Adjust this for different beat frequencies

    if (
      Math.floor(time / beatInterval) !==
      Math.floor((time - state.clock.getDelta()) / beatInterval)
    ) {
      shakeIntensity.current = intensity;
    }

    // Apply camera shake
    if (shakeIntensity.current > 0.001) {
      const shakeAmount = shakeIntensity.current;
      // camera.position.x =
      //   originalPosition.current.x + (Math.random() - 0.5) * shakeAmount;
      // camera.position.y =
      //   originalPosition.current.y + (Math.random() - 0.5) * shakeAmount;
      camera.position.z =
        originalPosition.current.z + (Math.random() - 0.5) * shakeAmount * 0;

      // Gradually reduce shake intensity
      shakeIntensity.current *= 0.9 * 0;
    } else {
      // Return to original position
      camera.position.lerp(originalPosition.current, 0.1);
    }
  });

  return null;
}
