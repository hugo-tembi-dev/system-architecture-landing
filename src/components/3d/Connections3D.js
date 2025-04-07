import React from 'react';
import { DataParticles } from './DataParticles';
import * as THREE from 'three';

// Define the connections between platforms
const connections = [
  // Analytics connections
  { from: [-5, 4, -5], to: [0, 2, 0] },     // Analytics to Ontology
  { from: [-5, 4, -5], to: [-6, 0, 5] },    // Analytics to Data

  // Integrations connections
  { from: [5, 4, -5], to: [0, 2, 0] },      // Integrations to Ontology
  { from: [5, 4, -5], to: [6, 0, 5] },      // Integrations to Models

  // Ontology connections
  { from: [0, 2, 0], to: [-6, 0, 5] },      // Ontology to Data
  { from: [0, 2, 0], to: [0, 0, 5] },       // Ontology to Workflows
  { from: [0, 2, 0], to: [6, 0, 5] },       // Ontology to Models

  // Data connections
  { from: [-6, 0, 5], to: [0, 0, 5] },      // Data to Workflows
  { from: [-6, 0, 5], to: [6, 0, 5] },      // Data to Models

  // Workflow connections
  { from: [0, 0, 5], to: [6, 0, 5] },       // Workflows to Models
];

// Create a basic line material for the connection paths
const lineMaterial = new THREE.LineBasicMaterial({
  color: '#4CAF50',
  transparent: true,
  opacity: 0.2,
});

export function Connections3D() {
  return (
    <group>
      {connections.map((connection, index) => {
        // Create curve for the connection path
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(...connection.from),
          new THREE.Vector3(
            (connection.from[0] + connection.to[0]) / 2,
            Math.max(connection.from[1], connection.to[1]) + 1,
            (connection.from[2] + connection.to[2]) / 2
          ),
          new THREE.Vector3(...connection.to)
        ]);

        // Create geometry for the connection path
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={index}>
            {/* Render the base connection line */}
            <line geometry={geometry}>
              <primitive object={lineMaterial} attach="material" />
            </line>
            
            {/* Add flowing particles */}
            <DataParticles
              start={connection.from}
              end={connection.to}
              particleCount={15}
            />
          </group>
        );
      })}
    </group>
  );
}
