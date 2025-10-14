'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number;
  pulsePhase: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  pulseTime: number;
}

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, touching: false });
  const lastFrameTime = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to true for dark mode
  const isDarkRef = useRef(true);
  const hoveredNodeRef = useRef<number>(-1);

  useEffect(() => {
    setMounted(true);

    // Check initial theme
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
      isDarkRef.current = dark;
    };
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check device size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      if (width < 1440) return 'desktop';
      return 'large';
    };

    let mobile = checkMobile();
    let screenSize = getScreenSize();

    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      mobile = checkMobile();
      screenSize = getScreenSize();

      // Reinitialize nodes on resize - scale with screen size
      const nodeCount =
        screenSize === 'mobile' ? 45 :
        screenSize === 'tablet' ? 70 :
        screenSize === 'desktop' ? 90 : 120;

      const nodeRadius =
        screenSize === 'mobile' ? 6 :
        screenSize === 'tablet' ? 5.5 :
        screenSize === 'desktop' ? 5 : 5;

      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: nodeRadius,
        connections: 0,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse/Touch tracking
    const handleMove = (x: number, y: number) => {
      mouseRef.current = { x, y, touching: true };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000, touching: false };
      hoveredNodeRef.current = -1;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      // Find clicked node
      const clickedNodeIndex = nodesRef.current.findIndex(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) < node.radius + 10;
      });

      if (clickedNodeIndex !== -1) {
        // Add explosion effect
        const clickedNode = nodesRef.current[clickedNodeIndex];
        nodesRef.current.forEach((node, idx) => {
          if (idx !== clickedNodeIndex) {
            const dx = node.x - clickedNode.x;
            const dy = node.y - clickedNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              node.vx += (dx / dist) * force * 5;
              node.vy += (dy / dist) * force * 5;
            }
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleClick);

    // Animation loop with FPS throttling for mobile
    const getTargetFPS = () => mobile ? 45 : 60;
    let targetFPS = getTargetFPS();
    let frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      // Throttle frame rate on mobile
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Reset connection counts
      nodesRef.current.forEach(node => node.connections = 0);

      // Update node positions
      nodesRef.current.forEach((node, idx) => {
        // Update pulse phase
        node.pulsePhase += 0.05;

        // Add constant gentle drift to keep things moving
        const driftForce = 0.008;
        node.vx += (Math.random() - 0.5) * driftForce;
        node.vy += (Math.random() - 0.5) * driftForce;

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with some padding and energy
        const padding = 20;
        if (node.x < padding || node.x > rect.width - padding) {
          node.vx *= -0.85;
          node.x = Math.max(padding, Math.min(rect.width - padding, node.x));
        }
        if (node.y < padding || node.y > rect.height - padding) {
          node.vy *= -0.85;
          node.y = Math.max(padding, Math.min(rect.height - padding, node.y));
        }

        // Mouse/Touch interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Check if hovering
        if (dist < node.radius + 15) {
          hoveredNodeRef.current = idx;
          canvas.style.cursor = 'pointer';
        }

        // Attract to mouse on mobile, repel on desktop
        const interactionRadius = mobile ? 200 : 180;
        if (dist < interactionRadius && mouseRef.current.touching) {
          const force = mobile ? 0.00008 : -0.00005;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        // Node-to-node attraction/repulsion for better clustering
        nodesRef.current.forEach((otherNode, otherIdx) => {
          if (idx !== otherIdx) {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Slight repulsion to prevent overlap
            if (dist < 40) {
              const force = (40 - dist) / 40 * 0.015;
              node.vx -= (dx / dist) * force;
              node.vy -= (dy / dist) * force;
            }

            // Gentle attraction at medium distance to create clusters
            if (dist > 80 && dist < 150) {
              const force = 0.0002;
              node.vx += (dx / dist) * force;
              node.vy += (dy / dist) * force;
            }
          }
        });

        // Less damping for more movement
        node.vx *= 0.992;
        node.vy *= 0.992;

        // Higher speed limit
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = mobile ? 2.5 : 3.5;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Minimum speed to keep things moving
        const minSpeed = 0.1;
        if (speed < minSpeed && speed > 0) {
          node.vx = (node.vx / speed) * minSpeed;
          node.vy = (node.vy / speed) * minSpeed;
        }
      });

      // Randomly trigger synaptic pulses
      if (Math.random() < 0.02) {
        const fromIdx = Math.floor(Math.random() * nodesRef.current.length);
        const toIdx = Math.floor(Math.random() * nodesRef.current.length);
        if (fromIdx !== toIdx) {
          connectionsRef.current.push({
            from: fromIdx,
            to: toIdx,
            strength: 1,
            pulseTime: currentTime
          });
        }
      }

      // Theme-based colors - use ref to avoid stale closure
      const edgeColor = isDarkRef.current ? '#fbbf24' : '#000000';
      const nodeColor = isDarkRef.current ? '#fbbf24' : '#000000';
      const nodeCenterColor = isDarkRef.current ? '#fef3c7' : '#4b5563';

      // Draw connections - with synaptic pulses
      const currentScreenSize = getScreenSize();
      const lineWidth =
        currentScreenSize === 'mobile' ? 2 :
        currentScreenSize === 'tablet' ? 1.8 :
        currentScreenSize === 'desktop' ? 2 : 2.2;

      const maxDistance =
        currentScreenSize === 'mobile' ? 160 :
        currentScreenSize === 'tablet' ? 180 :
        currentScreenSize === 'desktop' ? 220 : 260;

      ctx.lineWidth = lineWidth;

      // Draw regular connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            nodeA.connections++;
            nodeB.connections++;

            const baseOpacity = mobile ? 0.75 : 0.7;
            const opacity = (1 - distance / maxDistance) * baseOpacity;

            // Highlight connections to hovered node
            const extraOpacity = (i === hoveredNodeRef.current || j === hoveredNodeRef.current) ? 0.4 : 0;

            ctx.strokeStyle = edgeColor;
            ctx.globalAlpha = opacity + extraOpacity;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw synaptic pulses (brighter traveling signals)
      connectionsRef.current = connectionsRef.current.filter(conn => {
        const age = currentTime - conn.pulseTime;
        if (age > 1000) return false; // Remove old pulses

        const nodeA = nodesRef.current[conn.from];
        const nodeB = nodesRef.current[conn.to];
        if (!nodeA || !nodeB) return false;

        const progress = age / 1000; // 0 to 1
        const pulseX = nodeA.x + (nodeB.x - nodeA.x) * progress;
        const pulseY = nodeA.y + (nodeB.y - nodeA.y) * progress;

        // Draw bright pulse line
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = lineWidth * 1.5;
        ctx.globalAlpha = (1 - progress) * 0.8;

        const segmentLength = 30;
        const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);
        const startX = pulseX - Math.cos(angle) * segmentLength;
        const startY = pulseY - Math.sin(angle) * segmentLength;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pulseX, pulseY);
        ctx.stroke();

        // Draw pulse glow
        ctx.fillStyle = edgeColor;
        ctx.globalAlpha = (1 - progress) * 0.6;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw nodes with pulse (theme-aware)
      ctx.globalAlpha = 1;
      nodesRef.current.forEach((node, idx) => {
        const isHovered = idx === hoveredNodeRef.current;

        // Pulsing effect
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7; // 0.4 to 1.0
        const glowPulse = Math.sin(node.pulsePhase * 1.5) * 0.5 + 0.5; // 0 to 1

        // Draw outer glow (pulsing) - theme-based
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        if (isDarkRef.current) {
          gradient.addColorStop(0, `rgba(251, 191, 36, ${glowPulse * 0.4})`);
          gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
        } else {
          gradient.addColorStop(0, `rgba(0, 0, 0, ${glowPulse * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw extra glow for hovered node
        if (isHovered) {
          ctx.fillStyle = nodeColor;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Draw main node
        const radius = isHovered ? node.radius + 2 : node.radius;
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = pulse;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright center
        ctx.globalAlpha = 1;
        ctx.fillStyle = nodeCenterColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw extra bright center for nodes with many connections
        if (node.connections > 3) {
          ctx.fillStyle = isDarkRef.current ? '#ffffff' : '#9ca3af';
          ctx.globalAlpha = pulse;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reset cursor if not hovering
      if (hoveredNodeRef.current === -1) {
        canvas.style.cursor = 'default';
      }
      hoveredNodeRef.current = -1;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Determine opacity based on screen size - only after mount to avoid hydration mismatch
  const getOpacityClass = () => {
    if (!mounted) return 'opacity-60'; // Default for SSR
    const width = window.innerWidth;
    if (width < 768) return 'opacity-70';
    if (width < 1024) return 'opacity-65';
    if (width < 1440) return 'opacity-60';
    return 'opacity-55';
  };

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 touch-none ${getOpacityClass()}`}
      style={{
        background: 'transparent',
        width: '100vw',
        height: '100vh'
      }}
    />
  );
}
