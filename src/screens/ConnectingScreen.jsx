import { useEffect } from 'react';
import Orb from '../components/Orb.jsx';

export default function ConnectingScreen({ onDone, onCancel }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--bg)' }} className="screen-transition">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'var(--card)', color: '#C7C9CE', fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5B23D' }} />
          <span>Connecting</span>
        </div>
      </header>
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 24px' }}>
        <Orb size={220} mode="connecting" ground="var(--bg)" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>Connecting you to Disha…</div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>
            Allow microphone access when your browser asks. Prefer typing? You can switch anytime.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 12, background: 'var(--card)', border: '1px solid var(--border)', width: '100%', maxWidth: 420 }}>
          <span style={{ flexShrink: 0, color: 'var(--accent-light)', paddingTop: 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"></path><rect x="3" y="14" width="4" height="6" rx="1.5"></rect><rect x="17" y="14" width="4" height="6" rx="1.5"></rect></svg>
          </span>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: '#C7C9CE' }}>Find a quiet spot. Headphones help Disha hear you clearly.</span>
        </div>
      </main>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '24px 20px 40px' }}>
        <button
          type="button" onClick={onCancel}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, padding: '0 28px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
