import React from 'react';
import styled from 'styled-components';
import { Scene } from './3d/Scene';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

export const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
`;

export function Layout() {
  return (
    <Container>
      <Scene />
    </Container>
  );
}
