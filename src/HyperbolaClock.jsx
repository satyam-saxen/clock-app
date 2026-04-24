import { useEffect, useRef } from 'react';

export default function HyperbolaClock() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Hour positions on the two hyperbola branches
    // The numbers 1-12 are placed along two hyperbolic curves
    // Branch 1 (right): hours 10,11,12,1,2,3
    // Branch 2 (left): hours 4,5,6,7,8,9
    function getHourPositions(cx, cy, r) {
      const a = r * 0.38, b = r * 0.55;
      const positions = {};
      // Right branch: 10,11,12,1,2,3 (top to bottom)
      const rightHours = [10, 11, 12, 1, 2, 3];
      const rightTs = [-1.2, -0.7, -0.2, 0.3, 0.8, 1.3];
      rightHours.forEach((h, i) => {
        const t = rightTs[i];
        positions[h] = { x: cx + a * Math.cosh(t), y: cy + b * Math.sinh(t) };
      });
      // Left branch: 9,8,7,6,5,4 (top to bottom)
      const leftHours = [9, 8, 7, 6, 5, 4];
      const leftTs = [-1.2, -0.7, -0.2, 0.3, 0.8, 1.3];
      leftHours.forEach((h, i) => {
        const t = leftTs[i];
        positions[h] = { x: cx - a * Math.cosh(t), y: cy + b * Math.sinh(t) };
      });
      return positions;
    }

    function drawHyperbolaBranch(ctx, cx, cy, a, b, sign, r) {
      ctx.beginPath();
      for (let t = -1.6; t <= 1.6; t += 0.02) {
        const x = cx + sign * a * Math.cosh(t);
        const y = cy + b * Math.sinh(t);
        const dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy > r * r) continue;
        if (t === -1.6 || (t > -1.6 && t < -1.58)) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function draw() {
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      const r = Math.min(w, h) * 0.4;

      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, w, h);

      const now = new Date();
      const hour = now.getHours() % 12 || 12;
      const min = now.getMinutes();
      const sec = now.getSeconds();
      const ms = now.getMilliseconds();

      const a = r * 0.38, b = r * 0.55;

      // Draw outer circle
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Draw hyperbola curves
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 2;
      drawHyperbolaBranch(ctx, cx, cy, a, b, 1, r);
      drawHyperbolaBranch(ctx, cx, cy, a, b, -1, r);

      // Draw hour numbers on curves
      const positions = getHourPositions(cx, cy, r);
      ctx.font = `bold ${r * 0.09}px 'Courier New', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 1; i <= 12; i++) {
        const p = positions[i];
        ctx.fillStyle = i === hour ? '#fff' : '#555';
        ctx.fillText(i.toString(), p.x, p.y);
      }

      // Draw the rotating arm that indicates the hour
      // Arm angle based on current hour + fractional minutes
      const hourFrac = hour + min / 60 + sec / 3600;
      const targetPos = positions[hour];
      const nextHour = hour === 12 ? 1 : hour + 1;
      const nextPos = positions[nextHour];
      // Interpolate between current and next hour
      const frac = min / 60;
      const armX = targetPos.x + (nextPos.x - targetPos.x) * frac;
      const armY = targetPos.y + (nextPos.y - targetPos.y) * frac;
      const armAngle = Math.atan2(armY - cy, armX - cx);

      // Draw arm line through center to the hour position
      const armLen = r * 0.95;
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - Math.cos(armAngle) * armLen * 0.3, cy - Math.sin(armAngle) * armLen * 0.3);
      ctx.lineTo(cx + Math.cos(armAngle) * armLen, cy + Math.sin(armAngle) * armLen);
      ctx.stroke();

      // Draw 'X' at center
      const xSize = r * 0.04;
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - xSize, cy - xSize);
      ctx.lineTo(cx + xSize, cy + xSize);
      ctx.moveTo(cx + xSize, cy - xSize);
      ctx.lineTo(cx - xSize, cy + xSize);
      ctx.stroke();

      // Draw minute hand (conventional, from center)
      const minAngle = ((min + (sec + ms / 1000) / 60) / 60) * Math.PI * 2 - Math.PI / 2;
      const minLen = r * 0.7;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(minAngle) * minLen, cy + Math.sin(minAngle) * minLen);
      ctx.stroke();

      // Small dot at center
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Highlight intersection point
      ctx.fillStyle = '#4CAF50';
      ctx.beginPath();
      ctx.arc(armX, armY, 6, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', background: '#111' }} />;
}
