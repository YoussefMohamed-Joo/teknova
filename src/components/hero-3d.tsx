"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mount.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.current.appendChild(renderer.domElement);

    // شكل 3D — torus knot متداخل
    const geo1 = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
    const mat1 = new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      metalness: 0.3,
      roughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.1,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);

    const geo2 = new THREE.IcosahedronGeometry(0.8, 1);
    const mat2 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.scale.set(1.5, 1.5, 1.5);

    // جزيئات صغيرة
    const particlesGeo = new THREE.BufferGeometry();
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);

    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(particles);
    camera.position.z = 3.5;

    // Animation loop
    let frame: number;
    const animate = () => {
      const mx = mouse.current.x * 0.5;
      const my = mouse.current.y * 0.5;

      mesh1.rotation.x += 0.005 + my * 0.001;
      mesh1.rotation.y += 0.008 + mx * 0.001;
      mesh2.rotation.x += 0.003 + my * 0.0005;
      mesh2.rotation.y += 0.005 + mx * 0.0005;
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      if (mount.current) mount.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[40vh] lg:min-h-screen relative">
      <div ref={mount} className="w-[400px] h-[400px]" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
