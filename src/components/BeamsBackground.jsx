// src/components/BeamsBackground.jsx
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function BeamsBackground() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    /* ── Particles ── */
    const N_P = 900;
    const parts = Array.from({ length: N_P }, () => ({
      x:     Math.random() * 2400 - 200,
      y:     Math.random() * 2400 - 200,
      s:     0.4 + Math.random() * 1.7,
      op:    0.06 + Math.random() * 0.42,
      vx:    (Math.random() - 0.5) * 0.025,
      vy:    (Math.random() - 0.5) * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));

    /* ── Beams ── */
    const N_B = 11;
    const beams = Array.from({ length: N_B }, (_, i) => ({
      xR:    (i / (N_B - 1)) * 1.3 - 0.15,
      w:     0.8 + Math.random() * 2.4,
      op:    0.035 + Math.random() * 0.13,
      spd:   0.12 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2,
    }));

    /* ── Wireframe shapes ── */
    const shapes = [
      { verts: makeIco(4.5),  cx:  0.78, cy: 0.18, rz: 0 },
      { verts: makeOct(3.2),  cx:  0.12, cy: 0.65, rz: 0.3 },
      { verts: makeTet(3.8),  cx:  0.88, cy: 0.72, rz: 1.1 },
    ];

    function makeIco(r) {
      const t = (1 + Math.sqrt(5)) / 2;
      const raw = [
        [-1, t, 0],[1, t, 0],[-1,-t, 0],[1,-t, 0],
        [0,-1, t],[0, 1, t],[0,-1,-t],[0, 1,-t],
        [t, 0,-1],[t, 0, 1],[-t, 0,-1],[-t, 0, 1],
      ].map(([x,y,z])=>{ const n=Math.hypot(x,y,z)/r; return [x/n,y/n,z/n]; });
      const edges=[
        [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
        [2,3],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
        [4,5],[4,9],[4,11],[6,7],[6,8],[6,10],[7,8],[7,10],
        [5,9],[5,11],[9,8],[9,4],[10,11],
      ];
      return edges.map(([a,b])=>[raw[a],raw[b]]);
    }
    function makeOct(r) {
      const v=[
        [r,0,0],[-r,0,0],[0,r,0],[0,-r,0],[0,0,r],[0,0,-r],
      ];
      return [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],
              [2,4],[2,5],[3,4],[3,5]].map(([a,b])=>[v[a],v[b]]);
    }
    function makeTet(r) {
      const v=[
        [r,r,r],[r,-r,-r],[-r,r,-r],[-r,-r,r],
      ].map(([x,y,z])=>{const n=Math.hypot(x,y,z)/r;return[x/n,y/n,z/n];});
      return [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].map(([a,b])=>[v[a],v[b]]);
    }

    function project3D([x,y,z], cx, cy, W, H, fov=320){
      const d=fov/(fov+z);
      return [cx*W + x*d, cy*H + y*d];
    }

    function rotY([x,y,z], a){ return [x*Math.cos(a)+z*Math.sin(a),y,-x*Math.sin(a)+z*Math.cos(a)]; }
    function rotX([x,y,z], a){ return [x,y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)]; }

    let mouse = { x: 0.5, y: 0.5 };
    const onMouse = e => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouse);

    let t = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const rgb  = isDark ? '255,255,255' : '15,15,30';
      const am   = isDark ? 1 : 0.55;
      const gridC = isDark ? 'rgba(255,255,255,0.022)' : 'rgba(0,0,0,0.038)';

      /* grid */
      ctx.strokeStyle = gridC;
      ctx.lineWidth   = 0.5;
      for (let x=0;x<W;x+=58) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y=0;y<H;y+=58) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      /* beams */
      beams.forEach(b => {
        const pulse = b.op * (0.45 + 0.55*Math.sin(t*b.spd + b.phase));
        const bx    = b.xR * W + (mouse.x-0.5)*50;
        const ex    = bx   + H * 0.11;
        const g     = ctx.createLinearGradient(bx, 0, ex, H);
        g.addColorStop(0,   `rgba(${rgb},0)`);
        g.addColorStop(0.22,`rgba(${rgb},${pulse*am})`);
        g.addColorStop(0.5, `rgba(${rgb},${pulse*1.7*am})`);
        g.addColorStop(0.78,`rgba(${rgb},${pulse*am})`);
        g.addColorStop(1,   `rgba(${rgb},0)`);
        ctx.save();
        ctx.lineWidth   = b.w;
        ctx.strokeStyle = g;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `rgba(${rgb},${pulse*0.6})`;
        ctx.beginPath(); ctx.moveTo(bx,0); ctx.lineTo(ex,H); ctx.stroke();
        ctx.restore();
      });

      /* particles */
      const camX = (mouse.x-0.5)*55, camY = (mouse.y-0.5)*55;
      parts.forEach(p => {
        p.x += p.vx + Math.sin(t*0.22+p.phase)*0.018;
        p.y += p.vy + Math.cos(t*0.17+p.phase)*0.013;
        if (p.x < -200) p.x=W+200; if (p.x>W+200) p.x=-200;
        if (p.y < -200) p.y=H+200; if (p.y>H+200) p.y=-200;
        ctx.beginPath();
        ctx.arc(p.x-camX, p.y-camY, p.s, 0, Math.PI*2);
        ctx.fillStyle=`rgba(${rgb},${p.op*am})`;
        ctx.fill();
      });

      /* wireframe shapes */
      const shapeC = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
      ctx.strokeStyle = shapeC;
      ctx.lineWidth   = 0.7;
      shapes.forEach((sh,i) => {
        const rx = t*0.003*(i+1)*1.1;
        const ry = t*0.004*(i+1);
        sh.verts.forEach(([a,b]) => {
          let A=rotX(rotY(a,ry),rx), B=rotX(rotY(b,ry),rx);
          const [ax,ay]=project3D(A,sh.cx,sh.cy,W,H);
          const [bx,by]=project3D(B,sh.cx,sh.cy,W,H);
          ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
        });
      });

      t += 0.007;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}
    />
  );
}