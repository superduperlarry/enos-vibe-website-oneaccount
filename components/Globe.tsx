"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import dots from "@/lib/land-dots.json";

/**
 * Particle globe of the world's land masses. The Global South is lit in ENOS lime,
 * with payment flows arcing between corridors. Pure three.js, no extra libraries.
 */

// [lat, lon] — illustrative corridors: Global South sellers ↔ the clients and tools they pay or get paid by.
const CITIES: Record<string, [number, number]> = {
  manila: [14.6, 121.0],
  lagos: [6.5, 3.4],
  jakarta: [-6.2, 106.8],
  karachi: [24.9, 67.0],
  nairobi: [-1.3, 36.8],
  saoPaulo: [-23.5, -46.6],
  mexico: [19.4, -99.1],
  dhaka: [23.8, 90.4],
  cairo: [30.0, 31.2],
  hcmc: [10.8, 106.7],
  dubai: [25.2, 55.3],
  singapore: [1.35, 103.8],
  hongkong: [22.3, 114.2],
  london: [51.5, -0.1],
  berlin: [52.5, 13.4],
  sf: [37.8, -122.4],
  newyork: [40.7, -74.0],
  tokyo: [35.7, 139.7],
};

const ROUTES: [string, string][] = [
  ["manila", "sf"],
  ["manila", "dubai"],
  ["lagos", "london"],
  ["jakarta", "singapore"],
  ["karachi", "dubai"],
  ["nairobi", "berlin"],
  ["saoPaulo", "newyork"],
  ["mexico", "sf"],
  ["dhaka", "hongkong"],
  ["cairo", "london"],
  ["hcmc", "tokyo"],
  ["lagos", "dubai"],
  ["jakarta", "hongkong"],
  ["nairobi", "dubai"],
];

function toVec(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const isSouth = (lat: number, lon: number) => {
  if (lat > 37 || lat < -45) return false;
  if (lon > 112 && lat < -10) return false; // Australia
  if (lon > 125 && lat > 30) return false; // Japan/Korea
  if (lon < -30 && lat > 30) return false; // US
  return true;
};

export default function Globe({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL — the CSS glow behind stays as the fallback
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const world = new THREE.Group();
    world.rotation.set(0.32, -2.75, 0); // tilt; start facing South Asia, drifting west over the Gulf and Africa
    scene.add(world);

    // ---- Land particles ----
    const n = (dots as number[]).length / 2;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    const lime = new THREE.Color("#E1FF33");
    const mint = new THREE.Color("#5FA884");
    for (let i = 0; i < n; i++) {
      const lat = (dots as number[])[i * 2];
      const lon = (dots as number[])[i * 2 + 1];
      const v = toVec(lat, lon, 1);
      pos.set([v.x, v.y, v.z], i * 3);
      const c = isSouth(lat, lon) ? lime : mint;
      col.set([c.r, c.g, c.b], i * 3);
      seed[i] = Math.random();
    }
    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    landGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    landGeo.setAttribute("seed", new THREE.BufferAttribute(seed, 1));

    const pointMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSize: { value: 1 }, uPixel: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute vec3 color; attribute float seed;
        uniform float uTime; uniform float uSize; uniform float uPixel;
        varying vec3 vColor; varying float vAlpha;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(normalMatrix * position);
          float facing = smoothstep(-0.15, 0.6, n.z);           // fade the far side
          float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + seed * 40.0);
          vColor = color;
          vAlpha = facing * twinkle;
          gl_PointSize = uSize * uPixel * (2.8 + seed * 1.4) * (3.6 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor; varying float vAlpha;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, a * vAlpha * 0.9);
        }`,
    });
    world.add(new THREE.Points(landGeo, pointMat));

    // ---- Dark core so the far side doesn't show through ----
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x001a0f, transparent: true, opacity: 0.92 })
    );
    world.add(core);

    // ---- Atmosphere rim ----
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);} `,
        fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 4.0); gl_FragColor = vec4(0.45, 0.80, 0.45, 1.0) * i * 0.55; }`,
      })
    );
    scene.add(atmo);

    // ---- Payment arcs ----
    const arcMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        attribute float t; attribute float offset;
        varying float vT; varying float vOff; varying float vFacing;
        void main(){
          vT = t; vOff = offset;
          vec3 n = normalize(normalMatrix * normalize(position));
          vFacing = smoothstep(-0.35, 0.35, n.z);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; varying float vT; varying float vOff; varying float vFacing;
        void main(){
          float head = fract(uTime * 0.18 + vOff);
          float dist = head - vT;
          float comet = dist > 0.0 ? exp(-dist * 9.0) : 0.0;
          float base = 0.16;
          vec3 c = mix(vec3(0.40, 0.84, 0.84), vec3(0.88, 1.0, 0.2), comet);
          gl_FragColor = vec4(c, (base + comet * 1.3) * vFacing);
        }`,
    });

    const cityGeo: THREE.Vector3[] = [];
    ROUTES.forEach(([a, b], idx) => {
      const A = toVec(...CITIES[a], 1.0);
      const B = toVec(...CITIES[b], 1.0);
      const mid = A.clone().add(B).multiplyScalar(0.5);
      const lift = 1 + A.distanceTo(B) * 0.42;
      mid.normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
      const g = new THREE.TubeGeometry(curve, 96, 0.0042, 6, false);
      const uv = g.getAttribute("uv");
      const t = new Float32Array(uv.count);
      for (let k = 0; k < uv.count; k++) t[k] = uv.getX(k);
      const off = new Float32Array(uv.count).fill((idx * 0.137) % 1);
      g.setAttribute("t", new THREE.BufferAttribute(t, 1));
      g.setAttribute("offset", new THREE.BufferAttribute(off, 1));
      world.add(new THREE.Mesh(g, arcMat));
      cityGeo.push(A, B);
    });

    // ---- City beacons ----
    const beaconPos = new Float32Array(cityGeo.length * 3);
    cityGeo.forEach((v, i) => beaconPos.set([v.x * 1.005, v.y * 1.005, v.z * 1.005], i * 3));
    const beaconGeo = new THREE.BufferGeometry();
    beaconGeo.setAttribute("position", new THREE.BufferAttribute(beaconPos, 3));
    const beaconMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixel: { value: renderer.getPixelRatio() } },
      vertexShader: `uniform float uTime; uniform float uPixel; varying float vF;
        void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vec3 n = normalize(normalMatrix*position);
        vF = smoothstep(0.0, 0.5, n.z); gl_PointSize = uPixel * (14.0 + 6.0*sin(uTime*2.0 + position.x*20.0)) * (3.6 / -mv.z);
        gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vF; void main(){ float d = length(gl_PointCoord-0.5);
        float ring = smoothstep(0.5,0.42,d) * smoothstep(0.30,0.40,d); float dot = smoothstep(0.16,0.0,d);
        gl_FragColor = vec4(0.88,1.0,0.2,1.0) * (ring*0.6 + dot) * vF; }`,
    });
    world.add(new THREE.Points(beaconGeo, beaconMat));

    // ---- Drifting dust ----
    const dustN = 500;
    const dust = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      const r = 1.4 + Math.random() * 2.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      dust.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustPts = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0x9fe3a0, size: 0.012, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    scene.add(dustPts);

    // ---- Sizing ----
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ---- Interaction ----
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.25;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    let last = performance.now();
    let elapsed = 0;
    let raf = 0;
    let spin = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      const t = elapsed;
      if (!reduce) spin += dt * 0.06;
      const scrollK = Math.min(window.scrollY / window.innerHeight, 1.2);
      world.rotation.y = -2.75 + spin + target.x + scrollK * 0.6;
      world.rotation.x = 0.32 + target.y;
      dustPts.rotation.y = spin * 0.4;
      pointMat.uniforms.uTime.value = t;
      arcMat.uniforms.uTime.value = reduce ? 2.5 : t;
      beaconMat.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
