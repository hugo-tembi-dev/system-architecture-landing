import React from 'react';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

const iconMaterial = new THREE.MeshPhongMaterial({
  color: '#4CAF50',
  emissive: '#4CAF50',
  emissiveIntensity: 0.2,
  shininess: 30,
});

export function Icon3D({ type, position }) {
  const scale = 0.25;
  const yOffset = 0.5;
  const zOffset = -0.3; // Move icons slightly back
  const adjustedPosition = [position[0], position[1] + yOffset, position[2] + zOffset];

  switch (type) {
    case 'analytics':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Box args={[1, 3, 1]} position={[-1.5, 0, 0]} material={iconMaterial} />
          <Box args={[1, 2, 1]} position={[0, -0.5, 0]} material={iconMaterial} />
          <Box args={[1, 4, 1]} position={[1.5, 0.5, 0]} material={iconMaterial} />
        </group>
      );

    case 'integrations':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Torus args={[2, 0.4, 16, 32]} rotation={[Math.PI / 2, 0, 0]} material={iconMaterial} />
          <Box args={[1, 3, 1]} position={[0, 0, 0]} material={iconMaterial} />
        </group>
      );

    case 'ontology':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Sphere args={[1, 16, 16]} position={[0, 0, 0]} material={iconMaterial} />
          <Sphere args={[0.7, 16, 16]} position={[-2, 0, 0]} material={iconMaterial} />
          <Sphere args={[0.7, 16, 16]} position={[2, 0, 0]} material={iconMaterial} />
          <Cylinder args={[0.2, 0.2, 2, 8]} position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={iconMaterial} />
          <Cylinder args={[0.2, 0.2, 2, 8]} position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={iconMaterial} />
        </group>
      );

    case 'data':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Box args={[4, 3, 2]} material={iconMaterial} />
          <Cylinder args={[0.3, 0.3, 4, 8]} position={[0, -2, 0]} material={iconMaterial} />
        </group>
      );

    case 'workflows':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Box args={[1.5, 1.5, 1]} position={[-1.5, 1.5, 0]} material={iconMaterial} />
          <Box args={[1.5, 1.5, 1]} position={[1.5, -1.5, 0]} material={iconMaterial} />
          <Cylinder args={[0.2, 0.2, 3, 8]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} material={iconMaterial} />
        </group>
      );

    case 'models':
      return (
        <group position={adjustedPosition} scale={scale}>
          <Sphere args={[1.2, 16, 16]} material={iconMaterial} />
          <Torus args={[1.2, 0.2, 16, 32]} rotation={[Math.PI / 2, 0, 0]} material={iconMaterial} />
          <Torus args={[1.2, 0.2, 16, 32]} rotation={[0, 0, Math.PI / 2]} material={iconMaterial} />
        </group>
      );

    default:
      return null;
  }
}
