import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { RectAreaLight, Object3D } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// Initialize RectAreaLight uniforms immediately at module load
// This must happen before any materials are compiled
RectAreaLightUniformsLib.init();

interface RectAreaLightHelperProps {
  showHelper?: boolean;
  width?: number;
  height?: number;
  color?: string | number;
  intensity?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function RectAreaLightWithHelper({
  showHelper = false,
  color = '#ffffff',
  ...props
}: RectAreaLightHelperProps) {
  const lightRef = useRef<RectAreaLight>(null);

  if (showHelper) {
    useHelper(
      lightRef as React.RefObject<Object3D>,
      RectAreaLightHelper,
      color
    );
  }

  return <rectAreaLight ref={lightRef} {...props} />;
}
