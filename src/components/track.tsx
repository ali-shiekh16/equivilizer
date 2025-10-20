import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { suspend } from 'suspend-react';
import { createAudio } from '../lib/audio-utils';
import { FloorModel } from './floor-model';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
import { useControls } from 'leva';

interface Props {
  url: string;
  color: string;
  space?: number;
  width?: number;
  height?: number;
  obj?: THREE.Object3D;
}

function Track({
  url,
  color,
  space = 1.8,
  width = 0.03,
  height = 0.05,
  obj = new THREE.Object3D(),
  ...props
}: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const { camera } = useThree();
  const originalCameraPosition = useRef(new THREE.Vector3(0, 0.4, 2.7));
  const shakeIntensity = useRef(0);
  const lastBeatTime = useRef(0);
  const lightsRef = useRef<Array<THREE.Group | null>>([]);

  const lightsControls = useControls('Lights Group', {
    x: { value: 0, min: -5, max: 5, step: 0.1 },
    y: { value: 0.1, min: -5, max: 5, step: 0.1 },
    z: { value: 0, min: -5, max: 5, step: 0.1 },
    rotationY: {
      value: 0.21,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
      label: 'Rotation (Y)',
    },
    gap: { value: 0.47, min: 0, max: 1, step: 0.01, label: 'Gap/Spacing' },
    lightSpacing: {
      value: 2.4,
      min: 0.1,
      max: 3,
      step: 0.1,
      label: 'Light Spacing',
    },
    baseIntensity: {
      value: 5,
      min: 0,
      max: 50,
      step: 0.1,
      label: 'Base Intensity',
    },
  });

  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url]
  );

  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame(state => {
    if (!ref.current) return;

    update();
    const radius = space * 1.5;
    // const angleStep = -Math.PI / data.length;
    const angleStep = (-Math.PI * 1.8) / data.length;

    // Beat detection for camera shake
    const bassRange = data.slice(0, 10); // Low frequencies
    const bassAverage =
      bassRange.reduce((sum, val) => sum + val, 0) / bassRange.length;

    // Detect beats based on bass frequencies only
    const currentTime = state.clock.getElapsedTime();
    const timeSinceLastBeat = currentTime - lastBeatTime.current;

    if (bassAverage > 180 && timeSinceLastBeat > 0.2) {
      shakeIntensity.current = Math.min(1, bassAverage / 200);
      lastBeatTime.current = currentTime;
    }

    // Apply camera shake
    if (shakeIntensity.current > 0.01) {
      const shakeAmount = shakeIntensity.current * 0.03;
      // camera.position.x = originalCameraPosition.current.x + (Math.random() - 0.5) * shakeAmount;
      // camera.position.y = originalCameraPosition.current.y + (Math.random() - 0.5) * shakeAmount;
      camera.position.z =
        originalCameraPosition.current.z + (Math.random() - 0.5) * shakeAmount;

      // Gradually reduce shake intensity
      shakeIntensity.current *= 0.95;
    } else {
      // Return to original position
      camera.position.lerp(originalCameraPosition.current, 0.1);
    }

    for (let i = 0; i < data.length; i++) {
      // Calculate the scale based on music data
      const scaleY = 1 + data[i] / 25;

      // Calculate the position for the circular layout
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      // Apply the scale first
      obj.scale.set(1, scaleY, 1);

      // Then, set the position, lifting the bar by half its new height
      obj.position.set(x, (height * scaleY) / 2, z);

      // Update the matrix for this instance
      obj.updateMatrix();
      ref.current.setMatrixAt(i, obj.matrix);

      // Update corresponding rect area light to be right in front of the bar
      const lightGroup = lightsRef.current[i];
      if (lightGroup) {
        // Calculate light angle with custom spacing
        const lightAngle = i * angleStep * lightsControls.lightSpacing;
        const lightX = radius * Math.cos(lightAngle);
        const lightZ = radius * Math.sin(lightAngle);

        // Calculate the bar's normal direction (pointing toward center)
        const normalX = -Math.cos(lightAngle);
        const normalZ = -Math.sin(lightAngle);

        // Position light slightly in front of the bar (toward camera/center)
        // Use the gap control for the offset distance
        lightGroup.position.set(
          lightX + normalX * lightsControls.gap,
          (height * scaleY) / 2,
          lightZ + normalZ * lightsControls.gap
        );

        // Make the light face downward toward the floor for reflections
        // Rotate to point down with a slight tilt toward the bar
        lightGroup.rotation.set(0, Math.PI / 2 - angle, 0);

        // Update light dimensions to match bar
        const rectLight = lightGroup.children[0] as THREE.RectAreaLight;
        if (rectLight) {
          rectLight.width = width;
          rectLight.height = height * scaleY * 1.8;
          rectLight.intensity =
            lightsControls.baseIntensity * (1 + data[i] / 50);
        }
      }
    }

    // // Update the color
    // const newColor = new THREE.Color(color);
    // (ref.current.material as THREE.MeshStandardMaterial).color.copy(newColor);
    // (ref.current.material as THREE.MeshStandardMaterial).emissive.copy(
    //   newColor
    // );
    // (
    //   ref.current.material as THREE.MeshStandardMaterial
    // ).emissiveIntensity = 2.7;

    ref.current.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);

  return (
    <>
      <instancedMesh
        castShadow
        ref={ref}
        args={[undefined, undefined, data.length]}
        {...props}
        // position={[0.0, 0, 1]}
        position={[0.0, 0, 0.2]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </instancedMesh>

      {/* Per-bar rect area lights positioned right in front of each bar */}
      <group 
        position={[lightsControls.x, lightsControls.y, lightsControls.z]}
        rotation={[0, lightsControls.rotationY, 0]}
      >
        {new Array(25).fill(null).map((_, i) => (
          <group key={`bar-light-${i}`} ref={el => (lightsRef.current[i] = el)}>
            <rectAreaLight
              color={color}
              intensity={0.1}
              width={0.02}
              height={2}
              position={[0.2, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </group>
        ))}
      </group>

      <FloorModel scale={25} />
    </>
  );
}

export default Track;
