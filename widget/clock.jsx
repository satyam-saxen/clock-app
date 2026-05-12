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

const COL_HEIGHT = 184;
const ITEM_HEIGHT = COL_HEIGHT / 10;

export const render = () => {
  const time = getTime();
  return (
    <div className="clock">
      {time.split('').map((char, index) => {
        const digits = getDigitList(index, time);
        const currentIdx = digits.indexOf(char);
        const offset = (COL_HEIGHT / 2) - (currentIdx * ITEM_HEIGHT) - (ITEM_HEIGHT / 2);
        return (
          <div key={index} className="col">
            <div className="inner" style={{transform: `translateY(${offset}px)`}}>
              {digits.map((d, i) => (
                <span key={i} className={`digit${i === currentIdx ? ' active' : ''}`}>
                  {d}
                </span>
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
    height: 100%;
    background: #111;
    border-radius: 12px;
    overflow: hidden;
    padding: 8px;
    box-sizing: border-box;
  }

  .col {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: ${COL_HEIGHT}px;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s cubic-bezier(.4,2,.6,1);
    position: absolute;
    width: 100%;
    top: 0;
  }

  .digit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: ${ITEM_HEIGHT}px;
    border: 1px solid #444;
    border-radius: 100px;
    color: #555;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .digit.active {
    color: #410202;
    background: #fff;
    border-color: #fff;
    font-weight: bold;
  }
`;
