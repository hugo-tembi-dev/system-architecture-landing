import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.15);
  transform: translate3d(-50%, -50%, 0);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(76, 175, 80, 0.1);

  &:hover {
    transform: translate3d(-50%, -50%, 0) scale(1.05);
    box-shadow: 0 12px 48px rgba(76, 175, 80, 0.2);
    border: 2px solid rgba(76, 175, 80, 0.2);
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #2e7d32;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;

  svg {
    color: #4CAF50;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  line-height: 1.4;
`;

export function Card3D({ position, title, description, icon: Icon }) {
  const [hovered, setHovered] = useState(false);
  const yOffset = 1; // Offset above the platform

  return (
    <group position={[position[0], position[1] + yOffset, position[2]]}>
      <Html center>
        <CardContainer
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <Title>
            <Icon style={{ fontSize: '1.4rem' }} />
            {title}
          </Title>
          <Description>{description}</Description>
        </CardContainer>
      </Html>
    </group>
  );
}
