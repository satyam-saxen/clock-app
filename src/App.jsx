import { useEffect, useState } from 'react';
import './App.css';

const digitRanges = [
  [0, 2], // h1: 0-2
  [0, 9], // h2: 0-9 (will limit by hour logic)
  [0, 5], // m1: 0-5
  [0, 9], // m2: 0-9
  [0, 5], // s1: 0-5
  [0, 9], // s2: 0-9
];

function getDigitList(index, time) {
  const [min, max] = digitRanges[index] || [0, 9];
  if (index === 1 && time[0] === '2') return Array.from({length: 4}, (_, i) => String(i));
  return Array.from({length: max - min + 1}, (_, i) => String(i + min));
}

function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}${minutes}${seconds}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock fullscreen" style={{position: 'relative', fontFamily: "'Roboto Mono', 'Menlo', 'Consolas', monospace"}}>
      <div />
      <div className="digit-row">
        {time.split("").map((char, index) => {
          const digits = getDigitList(index, time);
          const currentIdx = digits.indexOf(char);
          const total = digits.length;
          const boxHeight = 100 / Math.max(total, 10); // percent height per box
          // Calculate translateY to center the current digit
          const translateY = `calc(50% - ${(currentIdx + 0.5) * boxHeight}vh)`;
          return (
            <div key={index} className="digit-stack fullscreen-stack" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
              <div
                className="digit-stack-inner fullscreen-stack-inner"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', transform: `translateY(${translateY})` }}
              >
                {digits.map((d, i) => (
                  <span
                    key={i}
                    className={`digit-box fullscreen-box${i === currentIdx ? ' center' : ''}`}
                    style={{ height: `${boxHeight}vh`, minHeight: 0, maxHeight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
