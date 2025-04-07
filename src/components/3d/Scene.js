import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Platform } from './Platform';
import { Card3D } from './Card3D';
import { Icon3D } from './Icon3D';
import { PlatformLabel } from './PlatformLabel';
import { Connections3D } from './Connections3D';
import * as THREE from 'three';
import { 
  FaChartLine, 
  FaPlug,
  FaProjectDiagram,
  FaDatabase,
  FaSitemap,
  FaBrain
} from 'react-icons/fa';

const INITIAL_CAMERA_POSITION = [0, 15, 20];

const cards = [
  {
    position: [-5, 4, -5],
    title: 'Analytics',
    description: 'Advanced data visualization and reporting tools',
    icon: FaChartLine,
    iconType: 'analytics'
  },
  {
    position: [5, 4, -5],
    title: 'Integrations',
    description: 'Seamless connection with external systems',
    icon: FaPlug,
    iconType: 'integrations'
  },
  {
    position: [0, 2, 0],
    title: 'Ontology',
    description: 'Semantic relationships and knowledge mapping',
    icon: FaProjectDiagram,
    iconType: 'ontology'
  },
  {
    position: [-6, 0, 5],
    title: 'Data',
    description: 'Structured and unstructured data management',
    icon: FaDatabase,
    iconType: 'data'
  },
  {
    position: [0, 0, 5],
    title: 'Workflows',
    description: 'Automated process management and optimization',
    icon: FaSitemap,
    iconType: 'workflows'
  },
  {
    position: [6, 0, 5],
    title: 'Models',
    description: 'Advanced analytics and prediction models',
    icon: FaBrain,
    iconType: 'models'
  }
];

function CameraController({ target, isAnimating, setIsAnimating }) {
  const { camera, controls } = useThree();
  const startPosition = useRef(new THREE.Vector3(...INITIAL_CAMERA_POSITION));
  const startTarget = useRef(new THREE.Vector3(0, 0, 0));
  const animationProgress = useRef(0);

  useFrame(() => {
    if (isAnimating && controls) {
      animationProgress.current += 0.02;
      
      if (animationProgress.current >= 1) {
        setIsAnimating(false);
        animationProgress.current = 0;
      } else {
        const targetPosition = target ? new THREE.Vector3(
          target.position[0],
          target.position[1] + 3,
          target.position[2] + 5
        ) : new THREE.Vector3(...INITIAL_CAMERA_POSITION);

        camera.position.lerpVectors(
          startPosition.current,
          targetPosition,
          animationProgress.current
        );

        const currentTarget = new THREE.Vector3();
        const targetPoint = target ? 
          new THREE.Vector3(...target.position) : 
          new THREE.Vector3(0, 0, 0);

        currentTarget.lerpVectors(
          startTarget.current,
          targetPoint,
          animationProgress.current
        );
        controls.target.copy(currentTarget);
        controls.update();
      }
    }
  });

  return null;
}

function SceneContent() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlatformClick = (card) => {
    if (!isAnimating) {
      if (selectedPlatform === card) {
        setSelectedPlatform(null);
      } else {
        setSelectedPlatform(card);
      }
      setIsAnimating(true);
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={INITIAL_CAMERA_POSITION} />
      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={30}
        enabled={!isAnimating}
      />
      
      <CameraController
        target={selectedPlatform}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <group>
        {cards.map((card, index) => (
          <group key={index}>
            <Platform 
              position={card.position}
              onClick={() => handlePlatformClick(card)}
              isSelected={selectedPlatform === card}
            />
            <Icon3D type={card.iconType} position={card.position} />
            <PlatformLabel 
              position={card.position}
              title={card.title}
              isSelected={selectedPlatform === card}
            />
            {selectedPlatform === card && !isAnimating && (
              <Card3D {...card} />
            )}
          </group>
        ))}
        <Connections3D />
      </group>
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: INITIAL_CAMERA_POSITION, fov: 60 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
