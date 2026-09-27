import { useEffect, useRef } from 'react';

// Recreates the particle-sphere animation from the Disha design mockups
// (a rotating point-cloud sphere whose "energy" reacts to speaking/listening state).
function buildPoints(n) {
  const g = Math.PI * (3 - Math.sqrt(5));
  const pts = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = g * i;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, seed: Math.random() });
  }
  return pts;
}

function buildLut() {
  const stops = [
    [0, [255, 176, 168]],
    [0.35, [240, 64, 52]],
    [0.68, [196, 32, 78]],
    [1, [255, 158, 64]],
  ];
  const dark = [58, 20, 26];
  const out = [];
  for (let l = 0; l < 8; l++) {
    const m = 0.22 + 0.78 * (l / 7);
    for (let h = 0; h < 32; h++) {
      const v = h / 31;
      let k = 0;
      while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
      const a = stops[k], b = stops[k + 1];
      const u = (v - a[0]) / (b[0] - a[0]);
      const c = [];
      for (let j = 0; j < 3; j++) {
        c.push(Math.round((a[1][j] + (b[1][j] - a[1][j]) * u) * m + dark[j] * (1 - m)));
      }
      out.push(`rgb(${c.join(',')})`);
    }
  }
  return out;
}

export default function Orb({ size = 120, mode = 'speaking', ground = 'var(--bg)' }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ raf: null, pts: null, colors: null, env: 0.3, builtFor: 0 });
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!st.pts || st.builtFor !== size) {
      st.pts = buildPoints(size >= 200 ? 3000 : size >= 120 ? 1500 : 900);
      st.builtFor = size;
    }
    if (!st.colors) st.colors = buildLut();

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();

    function draw(t) {
      const mode = modeRef.current;
      let target;
      if (mode === 'speaking') target = 0.45 + 0.55 * Math.abs(Math.sin(t * 2.3) * Math.sin(t * 0.9 + 1.3));
      else if (mode === 'listening') target = 0.2 + 0.12 * Math.abs(Math.sin(t * 1.1));
      else if (mode === 'connecting') target = 0.06;
      else target = 0;
      st.env += (target - st.env) * 0.08;
      const env = st.env;
      const spin = mode === 'connecting' ? 0.5 : mode === 'ended' ? 0.05 : 0.22;
      const cx = size / 2, cy = size / 2, R = size * 0.34;
      const ry = t * spin, rx = 0.3 + 0.12 * Math.sin(t * 0.17);
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'lighter';
      const dot = size >= 200 ? 1.1 : 0.8;
      const pts = st.pts, colors = st.colors;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const w = Math.sin(p.x * 3.2 + t * 1.9) * Math.sin(p.y * 4.1 - t * 1.4) + 0.6 * Math.sin(p.z * 5.3 + t * 2.6 + p.y * 2.0);
        let d = 1 + env * 0.11 * w;
        if (p.seed > 0.9) d += (p.seed - 0.9) * 2.4 * env * (0.6 + 0.4 * Math.sin(t * 3 + p.seed * 40));
        const x = p.x * d, y = p.y * d, z = p.z * d;
        const x1 = x * cY - z * sY, z1 = x * sY + z * cY;
        const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        const f = 3 / (3 - z2);
        const sx = cx + x1 * R * f, sy = cy + y1 * R * f;
        const rr = Math.min(1, Math.sqrt(x1 * x1 + y1 * y1) / d);
        const rim = Math.pow(rr, 6);
        const hue = Math.max(0, Math.min(31, Math.round((y1 / d * 0.5 + 0.5) * 31)));
        const lvl = Math.max(0, Math.min(7, Math.round(rim * 7)));
        ctx.globalAlpha = Math.min(1, (z2 > 0 ? 0.34 : 0.12) + 0.55 * rim);
        ctx.fillStyle = colors[lvl * 32 + hue];
        const s = dot * (0.9 + 1.3 * rim + (z2 > 0 ? 0.4 : 0));
        ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    if (reduce) {
      draw(2);
    } else {
      const frame = (now) => {
        draw((now - t0) / 1000);
        st.raf = requestAnimationFrame(frame);
      };
      st.raf = requestAnimationFrame(frame);
    }

    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
      st.raf = null;
    };
  }, [size]);

  return (
    <div style={{ width: size, height: size, background: ground, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Disha voice activity"
        style={{ width: size, height: size, display: 'block' }}
      />
    </div>
  );
}
