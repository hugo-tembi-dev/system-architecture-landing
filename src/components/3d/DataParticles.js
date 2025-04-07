import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function DataParticles({ start, end, particleCount = 20 }) {
  const points = useRef();
  const particlesRef = useRef();
  
  // Create a curved path for particles to follow
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        Math.max(start[1], end[1]) + 1,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    ]);
  }, [start, end]);

  // Initialize particle positions and speeds
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.3, // Random speed for each particle
        size: 0.08 + Math.random() * 0.05  // Random size for each particle
      });
    }
    return temp;
  }, [particleCount]);

  // Create geometry for particles
  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    particles.forEach((particle, i) => {
      const point = curve.getPoint(particle.progress);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      sizes[i] = particle.size;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, [curve, particles, particleCount]);

  // Animate particles along the curve
  useFrame((state) => {
    const positions = points.current.geometry.attributes.position.array;

    particles.forEach((particle, i) => {
      // Update progress
      particle.progress += particle.speed * 0.01;
      
      // Reset particle to start when it reaches the end
      if (particle.progress >= 1.0) {
        particle.progress = 0.0;
      }

      // Update particle position
      const point = curve.getPoint(particle.progress);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        ref={particlesRef}
        color="#4CAF50"
        size={0.15}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors={false}
        sizeAttenuation={true}
        map={new THREE.TextureLoader().load('/particle.png')}
      />
    </points>
  );
}
