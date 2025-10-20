import { useState } from 'react';
import App from '../App';

export function Overlay() {
  const [ready, set] = useState(false);
  return (
    <>
      {ready && <App />}
      <div
        className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${
          ready && 'clicked'
        }`}
      >
        <div className='stack'>
          <button onClick={() => set(true)}>▶️</button>
        </div>
      </div>
    </>
  );
}
