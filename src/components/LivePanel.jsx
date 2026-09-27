import { PANEL_STAGES, PICKS } from '../data/script.js';

const badgeColor = (kind) => (kind === 'new' ? 'var(--accent-light)' : kind === 'down' ? 'var(--muted)' : 'var(--good)');

export default function LivePanel({ stage = 'exploring', accepted, onAccept, onAsk, reportHref }) {
  const s = PANEL_STAGES[stage] || PANEL_STAGES.exploring;
  const isPick = !!s.pick;
  const pick = isPick ? PICKS[s.pick] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 24, overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em' }}>{s.heading}</h2>
          <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.done ? 'var(--good)' : 'var(--accent)' }} />
            <span>{s.pill}</span>
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: 'var(--muted)' }}>{s.intro}</p>
      </div>

      {isPick && (
        <article style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, borderRadius: 16, background: 'var(--card)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>{pick.badge}</span>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{pick.name}</h3>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>[University name]</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
            {[['Fee', '[₹ fee]'], ['Duration', '[months]'], ['Weekly', '[hrs]']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 10px', borderRadius: 10, background: 'var(--tile)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 800 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800 }}>Why it fits you</span>
            {pick.reasons.map((r) => (
              <div key={r} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-bg)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--warn-bg)', color: 'var(--warn-fg)', fontSize: 13, lineHeight: 1.45 }}>
            <strong>The trade-off:</strong> {pick.trade}
          </div>
          {accepted && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={reportHref} onClick={(e) => { e.preventDefault(); reportHref?.(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 52, borderRadius: 12, background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 800 }}>
                See my report
              </a>
              <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>Your profile and the full reasoning for all five options. You can keep asking Disha first.</span>
            </div>
          )}
          {!accepted && onAccept && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button type="button" onClick={onAccept} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 52, borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                That feels right
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" disabled title="Not part of this prototype" style={{ flexGrow: 1, height: 42, borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: 12, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>Not quite</button>
                <button type="button" disabled title="Not part of this prototype" style={{ flexGrow: 1, height: 42, borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: 12, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>Still not right</button>
              </div>
            </div>
          )}
        </article>
      )}

      {s.matches.length === 0 && !isPick && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '28px 20px', borderRadius: 12, border: '1.5px dashed var(--divider)', textAlign: 'center' }}>
          <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface)', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c3 2 9 2 12 0v-5"></path></svg>
          </span>
          <span style={{ fontSize: 14, fontWeight: 800 }}>No matches yet</span>
          <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--muted)' }}>Programmes appear here once Disha knows a little about you, usually after two or three questions.</span>
        </div>
      )}

      {s.matches.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {s.listLabel && <span style={{ fontSize: 13, fontWeight: 800 }}>{s.listLabel}</span>}
          {s.matches.map((p, i) => (
            <article key={p.name + i} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 14, borderRadius: 12, background: 'var(--card)', border: i === 0 && !isPick ? '1.5px solid var(--accent)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: i === 0 && !isPick ? 'var(--accent)' : 'var(--surface)', color: i === 0 && !isPick ? '#fff' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>
                  {isPick ? i + 2 : i + 1}
                </span>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    [University name]{p.badge && <> · <span style={{ fontWeight: 800, color: badgeColor(p.kind) }}>{p.badge}</span></>}
                  </span>
                </div>
              </div>
              <p style={{ margin: 0, paddingLeft: 34, fontSize: 13, lineHeight: 1.45, color: 'var(--muted)' }}>{p.reason}</p>
            </article>
          ))}
        </div>
      )}

      <p style={{ margin: 0, paddingBottom: 8, fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>{s.footer}</p>
    </div>
  );
}
