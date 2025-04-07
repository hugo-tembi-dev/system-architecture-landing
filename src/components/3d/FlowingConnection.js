import React, { useMemo } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// Create a custom shader material for the flowing effect
const FlowingMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#4CAF50'),
    speed: 1,
    opacity: 0.5,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float speed;
    uniform float opacity;
    varying vec2 vUv;

    void main() {
      float flow = fract(vUv.x - time * speed);
      float intensity = smoothstep(0.0, 0.1, flow) * smoothstep(0.4, 0.3, flow);
      gl_FragColor = vec4(color, intensity * opacity);
    }
  `
);

// Extend Three.js materials with our custom material
extend({ FlowingMaterial });

export function FlowingConnection({ start, end }) {
  // Create points for the line
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        Math.max(start[1], end[1]) + 1,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  // Create geometry from points
  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    // Add UV coordinates for the flowing effect
    const uvs = new Float32Array(points.length * 2);
    for (let i = 0; i < points.length; i++) {
      uvs[i * 2] = i / (points.length - 1);
      uvs[i * 2 + 1] = 0;
    }
    lineGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    return lineGeometry;
  }, [points]);

  return (
    <line geometry={geometry}>
      <flowingMaterial
        transparent
        depthWrite={false}
        speed={0.5}
        time={0}
        attach="material"
      />
    </line>
  );
}
