import React from 'react';
import { Text } from '@react-three/drei';

export function PlatformLabel({ position, title, isSelected }) {
  // Position the text in front of the platform
  const textPosition = [position[0], position[1] + 0.15, position[2] + 0.8];
  
  return (
    <Text
      position={textPosition}
      fontSize={0.3}
      maxWidth={3}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      anchorY="bottom"
      color={isSelected ? '#4CAF50' : '#666666'}
      outlineWidth={0.005}
      outlineColor="#ffffff"
      outlineBlur={0.001}
      renderOrder={1}
      depthTest={false}
    >
      {title.toUpperCase()}
    </Text>
  );
}
