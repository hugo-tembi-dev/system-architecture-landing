import React, { useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function Platform({ position, onClick, isSelected, ...props }) {
  const [hovered, setHovered] = useState(false);

  // Get the emissive intensity based on platform state
  const getEmissiveIntensity = () => {
    if (isSelected) return 0.5;
    if (hovered) return 0.4;
    return 0.2;
  };

  // Create materials for the platform
  const materials = [
    // Right side
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#4CAF50',
      emissiveIntensity: getEmissiveIntensity(),
      shininess: 30 
    }),
    // Left side
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#4CAF50',
      emissiveIntensity: getEmissiveIntensity(),
      shininess: 30 
    }),
    // Top
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#000000',
      shininess: 30 
    }),
    // Bottom
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#000000',
      shininess: 30 
    }),
    // Front
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#4CAF50',
      emissiveIntensity: getEmissiveIntensity(),
      shininess: 30 
    }),
    // Back
    new THREE.MeshPhongMaterial({ 
      color: '#ffffff',
      emissive: '#4CAF50',
      emissiveIntensity: getEmissiveIntensity(),
      shininess: 30 
    })
  ];

  return (
    <RoundedBox
      args={[4, 0.2, 2]} // width, height, depth
      radius={0.1} // border radius
      smoothness={4} // optional, number of subdivisions
      position={position}
      material={materials}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      {...props}
    >
    </RoundedBox>
  );
}
