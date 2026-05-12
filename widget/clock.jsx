export const refreshFrequency = 1000;

export const command = "echo ''";

const digitRanges = [
  [0, 2], [0, 9], [0, 5], [0, 9], [0, 5], [0, 9],
];

function getDigitList(index, time) {
  const [min, max] = digitRanges[index];
  if (index === 1 && time[0] === '2') return Array.from({length: 4}, (_, i) => String(i));
  return Array.from({length: max - min + 1}, (_, i) => String(i + min));
}

function getTime() {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(v => String(v).padStart(2, '0')).join('');
}

const COL = 180;
const CELL = COL / 10;

export const render = () => {
  const time = getTime();
  return (
    <div className="clock">
      {time.split('').map((char, index) => {
        const digits = getDigitList(index, time);
        const currentIdx = digits.indexOf(char);
        const top = (COL / 2) - (currentIdx * CELL) - (CELL / 2);
        return (
          <div key={index} className="col">
            <div className="inner" style={{top: `${top}px`}}>
              {digits.map((d, i) => (
                <div key={i} className={`cell${i === currentIdx ? ' active' : ''}`}>{d}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const className = `
  left: 20px;
  top: 20px;
  width: 500px;
  height: 200px;

  .clock {
    display: flex;
    gap: 4px;
    width: 100%;
    height: 100%;
    background: #111;
    border-radius: 12px;
    overflow: hidden;
    padding: 8px;
    box-sizing: border-box;
  }

  .col {
    flex: 1;
    position: relative;
    overflow: hidden;
    height: ${COL}px;
  }

  .inner {
    position: absolute;
    left: 0;
    right: 0;
    transition: top 0.3s cubic-bezier(.4,2,.6,1);
  }

  .cell {
    height: ${CELL}px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #444;
    border-radius: 6px;
    color: #555;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    box-sizing: border-box;
    width: 50%;
    margin: 0 auto;
    font-weight: bold;
  }

  .cell.active {
    color: #410202;
    background: #fff;
    border-color: #fff;
    font-weight: bold;
  }
`;
