import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/** 黑洞世界坐标：右下区域，用于引力与视觉 */
export const BLACK_HOLE_POS = new THREE.Vector3(11, -5.5, 6);

function hashHue(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  return (Math.abs(h) % 360) / 360;
}

function randomSpherePoint(rMin, rMax) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = rMin + Math.random() * (rMax - rMin);
  const sinPhi = Math.sin(phi);
  return new THREE.Vector3(
    r * sinPhi * Math.cos(theta),
    r * sinPhi * Math.sin(theta),
    r * Math.cos(phi),
  );
}

function createSoftCircleTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  g.addColorStop(0.55, 'rgba(200,230,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/** 深蓝→黑渐变天球（背面） */
function GradientSky() {
  const mat = useMemo(() => {
    const vertexShader = `
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      varying vec3 vWorld;
      void main() {
        float t = (vWorld.y + 80.0) / 160.0;
        t = clamp(t, 0.0, 1.0);
        vec3 top = vec3(0.02, 0.07, 0.24);
        vec3 mid = vec3(0.01, 0.03, 0.1);
        vec3 bot = vec3(0.0, 0.0, 0.0);
        vec3 c = mix(bot, mid, smoothstep(0.0, 0.55, t));
        c = mix(c, top, smoothstep(0.45, 1.0, t));
        gl_FragColor = vec4(c, 1.0);
      }
    `;
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh renderOrder={-100}>
      <sphereGeometry args={[220, 32, 32]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/** 星河粒子：闪烁 + 缓慢公转 */
function GalaxyStarfield({ count = 16000 }) {
  const ref = useRef(null);
  const mat = useMemo(() => {
    const vertexShader = `
      attribute float aPhase;
      attribute float aSize;
      varying float vTw;
      varying float vAlpha;
      uniform float uTime;
      void main() {
        vTw = sin(uTime * 1.8 + aPhase) * 0.5 + 0.5;
        vec3 pos = position;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        float dist = -mv.z;
        gl_PointSize = aSize * (420.0 / max(dist, 1.0)) * (0.75 + vTw * 0.35);
        gl_Position = projectionMatrix * mv;
        vAlpha = 0.12 + vTw * 0.38;
      }
    `;
    const fragmentShader = `
      varying float vTw;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = length(c);
        if (d > 0.5) discard;
        float soft = smoothstep(0.5, 0.0, d);
        vec3 col = mix(vec3(0.75, 0.88, 1.0), vec3(1.0, 0.98, 0.95), vTw * 0.35);
        gl_FragColor = vec4(col, soft * vAlpha);
      }
    `;
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const p = randomSpherePoint(35, 118);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.35 + Math.random() * 0.85;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    mat.uniforms.uTime.value += delta;
    if (ref.current) ref.current.rotation.y += 0.018 * delta;
    if (ref.current) ref.current.rotation.x += 0.006 * delta;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <primitive object={mat} attach="material" />
    </points>
  );
}

function BlackHoleVisual() {
  const ring = useRef(null);
  const swirl = useRef(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += 0.35 * delta;
    if (swirl.current) swirl.current.rotation.z -= 0.55 * delta;
  });

  return (
    <group position={BLACK_HOLE_POS.toArray()}>
      <mesh renderOrder={50}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#030308" depthWrite={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.95, 0.04, 12, 64]} />
        <meshBasicMaterial color="#1a1a24" transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh ref={swirl} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.25, 0.02, 8, 48]} />
        <meshBasicMaterial
          color="#3d4a6a"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#0a0a12"
          transparent
          opacity={0.45}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function GlowingInspirationStar({ star, onSelect, circleTex }) {
  const sprite = useRef(null);
  const pos = useRef(new THREE.Vector3(0, -2.8, 16));
  const target = useMemo(() => star.target.clone(), [star.target]);
  const color = useMemo(() => {
    const c = new THREE.Color();
    c.setHSL(hashHue(star.text), 0.52, 0.62);
    return c;
  }, [star.text]);

  useFrame((state, delta) => {
    if (!sprite.current) return;
    const t = state.clock.elapsedTime;
    const p = pos.current;
    const toward = target.clone().sub(p);
    const step = (0.012 + star.speed * 0.022) * (60 * delta);
    toward.multiplyScalar(Math.min(1, step));
    p.add(toward);

    const toBH = BLACK_HOLE_POS.clone().sub(p);
    const d = toBH.length();
    if (d > 0.01) {
      toBH.normalize().multiplyScalar(0.018 * star.brightness * (1 / (d * 0.08 + 1)));
      p.add(toBH);
    }

    p.x += Math.sin(t * 0.7 + star.wobblePhase) * 0.012;
    p.y += Math.cos(t * 0.55 + star.wobblePhase * 1.3) * 0.01;
    p.z += Math.sin(t * 0.4 + star.wobblePhase * 0.8) * 0.008;

    sprite.current.position.copy(p);

    const pulse = 0.88 + Math.sin(t * star.pulseFreq + star.phase) * 0.14;
    const base = 0.55 + star.brightness * 1.1;
    sprite.current.scale.setScalar(base * pulse);

    sprite.current.material.opacity = 0.75 + star.brightness * 0.22;
  });

  return (
    <sprite
      ref={sprite}
      position={[0, -2.8, 16]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(star);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <spriteMaterial
        map={circleTex}
        color={color}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.95}
      />
    </sprite>
  );
}

export function InsightStarFieldScene({ stars, onStarSelect }) {
  const circleTex = useMemo(() => createSoftCircleTexture(), []);

  return (
    <>
      <GradientSky />
      <color attach="background" args={['#02040c']} />
      <fog attach="fog" args={['#020308', 28, 190]} />
      <ambientLight intensity={0.08} />
      <pointLight position={[30, 20, 24]} intensity={0.55} color="#a8c8ff" />
      <pointLight position={[-24, -12, 8]} intensity={0.2} color="#4060a0" />

      <GalaxyStarfield count={16000} />

      <group>
        {stars.map((s) => (
          <GlowingInspirationStar
            key={s.id}
            star={s}
            onSelect={onStarSelect}
            circleTex={circleTex}
          />
        ))}
      </group>

      <BlackHoleVisual />

      <OrbitControls
        enablePan
        minDistance={8}
        maxDistance={72}
        rotateSpeed={0.65}
        zoomSpeed={0.75}
        panSpeed={0.35}
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI * 0.92}
        minPolarAngle={0.08}
      />
    </>
  );
}

export function makeStarRecord(text, { brightness, speed, negativity, pulseFreq }) {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `star-${Date.now()}-${Math.random()}`;
  const target = randomSpherePoint(14, 32);
  const phase = Math.random() * Math.PI * 2;
  const wobblePhase = Math.random() * Math.PI * 2;
  return {
    id,
    text,
    brightness,
    speed,
    negativity: negativity ?? 0,
    pulseFreq: pulseFreq ?? 1.2,
    phase,
    wobblePhase,
    target,
  };
}
