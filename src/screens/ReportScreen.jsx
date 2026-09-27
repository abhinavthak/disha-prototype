import { useState } from 'react';
import Orb from '../components/Orb.jsx';
import { REPORT } from '../data/script.js';
import useIsDesktop from '../hooks/useIsDesktop.js';

export default function ReportScreen({ onRestart }) {
  const [open, setOpen] = useState(true);
  const [share, setShare] = useState(false);
  const [name] = useState('Priya');
  const best = REPORT.programmes[0];
  const others = REPORT.programmes.slice(1);
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--report-bg)', color: 'var(--report-text)', position: 'relative' }} className="screen-transition">
        <section style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)', padding: '0 80px 56px' }}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0 32px' }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
            <button type="button" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, fontSize: 14, fontWeight: 700, color: 'var(--accent-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
              <span>Not quite right? Talk to Disha again</span>
            </button>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 64, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}><Orb size={88} mode="listening" ground="var(--bg)" /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>Disha's recommendations</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{REPORT.dateLine}</span>
                </div>
              </div>
              <h1 style={{ margin: 0, fontSize: 52, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>{REPORT.headline}</h1>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => window.alert('This prototype does not generate a real PDF.')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, padding: '0 24px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11"></path><path d="M7 10l5 5 5-5"></path><path d="M5 20h14"></path></svg>
                  <span>Download report</span>
                </button>
                <button type="button" onClick={() => setShare(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, padding: '0 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="M8.2 10.8l7.6-4.4"></path><path d="M8.2 13.2l7.6 4.4"></path></svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 28, borderRadius: 18, background: 'var(--surface-2)', border: '1px solid var(--border-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true"><path d="M7 7h4v4c0 3-1.5 5-4 6l-.8-1.4C7.6 14.8 8.4 13.6 8.5 12H7zM14 7h4v4c0 3-1.5 5-4 6l-.8-1.4c1.4-.8 2.2-2 2.3-3.6H14z"></path></svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#C7C9CE' }}>Disha's take</span>
              </div>
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.55, color: '#EDEDEF' }}>{REPORT.take}</p>
            </div>
          </div>
        </section>

        <main style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '360px minmax(0, 1fr)', gap: 32, alignItems: 'start', padding: '40px 80px 64px' }}>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 24, borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1A1A1A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 800 }}>{name[0]}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>Your learner profile</div>
                  <div style={{ fontSize: 12, color: 'var(--report-muted)' }}>What Disha understood from the call</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
                {REPORT.profile.map((f) => (
                  <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 12px', borderRadius: 10, background: 'var(--report-tile)' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--report-muted)' }}>{f.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{f.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 10, background: 'var(--report-accent-bg)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#9E1A12' }}>Your goal</span>
                <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>{REPORT.goal}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 10, background: 'var(--report-tile)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--report-muted)' }}>What worried you</span>
                <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>{REPORT.worry}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1px solid var(--report-border)' }}>
                <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: '#1A1A1A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"></path><path d="M7 16v-5"></path><path d="M12 16V6"></path><path d="M17 16v-8"></path></svg>
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--report-muted)' }}>How you like to work</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{REPORT.workStyle}</span>
                </div>
              </div>
            </section>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px', fontSize: 13, lineHeight: 1.5, color: 'var(--report-muted)' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); window.alert('This prototype does not wire up the human-counsellor flow.'); }} style={{ fontWeight: 700 }}>Talk to a human counsellor</a>
              <span>Before you pay anything, check the exact programme and academic session on the UGC-DEB portal.</span>
            </div>
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <article style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, background: 'var(--report-card)', border: '2px solid var(--accent)', overflow: 'hidden', boxShadow: '0 30px 60px -40px rgba(225,37,27,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 28px', background: 'var(--accent)', color: '#fff' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 800 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"></path></svg>
                  <span>Best fit for you</span>
                </span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>1 of 5</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 36, padding: 28 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: 12, border: '1px dashed #C9C9CF', background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--report-muted)' }}>Logo</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>{best.name}</h2>
                      <div style={{ fontSize: 14, color: 'var(--report-muted)' }}>{best.uni}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                    {[['Fee', best.fee], ['Duration', best.duration], ['Weekly', best.effort]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 12, borderRadius: 10, background: 'var(--report-tile)' }}>
                        <span style={{ fontSize: 11, color: 'var(--report-muted)', fontWeight: 600 }}>{k}</span>
                        <span style={{ fontSize: 16, fontWeight: 800 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, padding: '0 24px', borderRadius: 8, background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
                    <span>View programme</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>
                  </a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 36, borderLeft: '1px solid #EFEFF1' }}>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>Why it fits you</div>
                  {best.reasons.map((r) => (
                    <div key={r} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.55 }}>
                      <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--report-accent-bg)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                      </span>
                      <span>{r}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 10, padding: 14, borderRadius: 10, background: 'var(--report-warn-bg)', color: 'var(--report-warn-fg)' }}>
                    <svg style={{ flexShrink: 0, marginTop: 1 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M5 7l-3 7a3 3 0 0 0 6 0z"></path><path d="M19 7l-3 7a3 3 0 0 0 6 0z"></path></svg>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 12, fontWeight: 800 }}>The trade-off for you</span>
                      <span style={{ fontSize: 14, lineHeight: 1.45 }}>{best.tradeoff}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Also consider</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
                {others.map((p, i) => (
                  <article key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 20, borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, border: '1px dashed #C9C9CF', background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--report-muted)' }}>Logo</div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--report-muted)' }}>{i + 2} of 5</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, lineHeight: 1.3 }}>{p.name}</h3>
                      <div style={{ fontSize: 13, color: 'var(--report-muted)' }}>{p.uni}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.fee} · {p.duration} · {p.effort}/wk</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #EFEFF1', paddingTop: 12 }}>
                      {p.reasons.slice(0, 2).map((r) => (
                        <div key={r} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.45 }}>
                          <span style={{ flexShrink: 0, color: 'var(--accent)', paddingTop: 2 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                          </span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                      <span>View programme</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)', overflow: 'hidden' }}>
              <button aria-expanded={open} onClick={() => setOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', minHeight: 68, border: 'none', background: 'var(--report-card)', color: 'var(--report-text)', textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 20 12z"></path><path d="M9 10h6"></path><path d="M9 13.5h4"></path></svg>
                </span>
                <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>Conversation transcript</span>
                  <span style={{ fontSize: 12, color: 'var(--report-muted)' }}>11 min 52 s · auto-generated</span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'none' : 'rotate(180deg)' }}><path d="M6 15l6-6 6 6"></path></svg>
              </button>
              {open && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 24px 24px', borderTop: '1px solid #EFEFF1' }}>
                  <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: 'var(--report-warn-bg)', color: 'var(--report-warn-fg)', fontSize: 12, lineHeight: 1.45 }}>
                    Auto-generated from the call. Names and numbers may be wrong. Not included in your shared report.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640 }}>
                    {REPORT.transcript.map((t, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: t.who === 'd' ? 'flex-start' : 'flex-end' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--report-muted)' }}>{t.who === 'd' ? 'Disha' : 'You'} · {t.time}</span>
                        <div style={{ maxWidth: '86%', padding: '10px 12px', borderRadius: 12, background: t.who === 'd' ? 'var(--report-tile)' : 'var(--report-accent-bg)', fontSize: 14, lineHeight: 1.5 }}>{t.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, maxWidth: 400 }}>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 44, borderRadius: 8, border: '1px solid #D9D9DE', color: 'var(--report-text)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Show full transcript</a>
                    <button aria-label="Copy transcript" style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid #D9D9DE', background: 'var(--report-card)', color: 'var(--report-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>
                    </button>
                  </div>
                </div>
              )}
            </section>

            <button type="button" onClick={onRestart} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: 'var(--report-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Start over
            </button>
          </div>
        </main>

        {share && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,12,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }} onClick={() => setShare(false)}>
            <div role="dialog" aria-label="Share your report" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 28px 28px', borderRadius: 20, background: '#fff', color: '#1A1A1A', width: 440 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Share your report</h2>
                <button aria-label="Close" onClick={() => setShare(false)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: '#F6F6F7', color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>
                </button>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#5C5F66' }}>Anyone with the link can see your profile, Disha's pick and why it fits. Useful for talking it through with family.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
                {['Copy link', 'WhatsApp', 'Email', 'PDF'].map((label) => (
                  <button key={label} type="button" onClick={() => setShare(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minHeight: 44, color: '#1A1A1A', fontSize: 12, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#F6F6F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle></svg>
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 10, background: '#F6F6F7' }}>
                <input id="share-tx-d" type="checkbox" style={{ width: 20, height: 20, marginTop: 1, accentColor: '#E1251B', flexShrink: 0 }} />
                <label htmlFor="share-tx-d" style={{ fontSize: 13, lineHeight: 1.45, color: '#1A1A1A' }}>Include the conversation transcript <span style={{ color: '#5C5F66' }}>(off by default, it may contain transcription errors)</span></label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--report-bg)', color: 'var(--report-text)', position: 'relative' }} className="screen-transition">
      <section style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)', paddingBottom: 28 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
          <button type="button" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, fontSize: 13, fontWeight: 700, color: 'var(--accent-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
            <span>Talk again</span>
          </button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}><Orb size={64} mode="listening" ground="var(--bg)" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>Disha's recommendations</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{REPORT.dateLine}</span>
            </div>
          </div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{REPORT.headline}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true"><path d="M7 7h4v4c0 3-1.5 5-4 6l-.8-1.4C7.6 14.8 8.4 13.6 8.5 12H7zM14 7h4v4c0 3-1.5 5-4 6l-.8-1.4c1.4-.8 2.2-2 2.3-3.6H14z"></path></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#C7C9CE' }}>Disha's take</span>
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#EDEDEF' }}>{REPORT.take}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
            <button type="button" onClick={() => window.alert('This prototype does not generate a real PDF.')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11"></path><path d="M7 10l5 5 5-5"></path><path d="M5 20h14"></path></svg>
              <span>Download report</span>
            </button>
            <button type="button" onClick={() => setShare(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="M8.2 10.8l7.6-4.4"></path><path d="M8.2 13.2l7.6 4.4"></path></svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px 16px 32px', gap: 28 }}>
        <article style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, background: 'var(--report-card)', border: '2px solid var(--accent)', overflow: 'hidden', boxShadow: '0 20px 40px -28px rgba(225,37,27,0.45)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--accent)', color: '#fff' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 800 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"></path></svg>
              <span>Best fit for you</span>
            </span>
            <span style={{ fontSize: 12, fontWeight: 700 }}>1 of 5</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 18 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 10, border: '1px dashed #C9C9CF', background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--report-muted)' }}>Logo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{best.name}</h2>
                <div style={{ fontSize: 13, color: 'var(--report-muted)' }}>{best.uni}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
              {[['Fee', best.fee], ['Duration', best.duration], ['Weekly', best.effort]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 10, borderRadius: 10, background: 'var(--report-tile)' }}>
                  <span style={{ fontSize: 11, color: 'var(--report-muted)', fontWeight: 600 }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Why it fits you</div>
              {best.reasons.map((r) => (
                <div key={r} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--report-accent-bg)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                  </span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 10, background: 'var(--report-warn-bg)', color: 'var(--report-warn-fg)' }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M5 7l-3 7a3 3 0 0 0 6 0z"></path><path d="M19 7l-3 7a3 3 0 0 0 6 0z"></path></svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 800 }}>The trade-off for you</span>
                <span style={{ fontSize: 13, lineHeight: 1.45 }}>{best.tradeoff}</span>
              </div>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 8, background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700 }}>
              <span>View programme</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>
            </a>
          </div>
        </article>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px' }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Also consider</h2>
            <span style={{ fontSize: 12, color: 'var(--report-muted)' }}>Swipe to compare</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', margin: '0 -16px', padding: '0 16px 6px' }}>
            {others.map((p, i) => (
              <article key={p.name} style={{ flexShrink: 0, width: 260, display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, border: '1px dashed #C9C9CF', background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'var(--report-muted)' }}>Logo</div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--report-muted)' }}>{i + 2} of 5</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, lineHeight: 1.3 }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: 'var(--report-muted)' }}>{p.uni}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.fee} · {p.duration} · {p.effort}/wk</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #EFEFF1', paddingTop: 10 }}>
                  {p.reasons.slice(0, 2).map((r) => (
                    <div key={r} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.45 }}>
                      <span style={{ flexShrink: 0, color: 'var(--accent)', paddingTop: 2 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                      </span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, fontSize: 14, fontWeight: 700 }}>
                  <span>View programme</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 18, borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1A1A1A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>{name[0]}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>Your learner profile</div>
              <div style={{ fontSize: 12, color: 'var(--report-muted)' }}>What Disha understood from the call</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
            {REPORT.profile.map((f) => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 12px', borderRadius: 10, background: 'var(--report-tile)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--report-muted)' }}>{f.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{f.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 10, background: 'var(--report-accent-bg)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#9E1A12' }}>Your goal</span>
            <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>{REPORT.goal}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 10, background: 'var(--report-tile)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--report-muted)' }}>What worried you</span>
            <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>{REPORT.worry}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1px solid var(--report-border)' }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: '#1A1A1A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"></path><path d="M7 16v-5"></path><path d="M12 16V6"></path><path d="M17 16v-8"></path></svg>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--report-muted)' }}>How you like to work</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{REPORT.workStyle}</span>
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, background: 'var(--report-card)', border: '1px solid var(--report-border)', overflow: 'hidden' }}>
          <button aria-expanded={open} onClick={() => setOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', minHeight: 64, border: 'none', background: 'var(--report-card)', color: 'var(--report-text)', textAlign: 'left', cursor: 'pointer' }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: 'var(--report-tile)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 20 12z"></path><path d="M9 10h6"></path><path d="M9 13.5h4"></path></svg>
            </span>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>Conversation transcript</span>
              <span style={{ fontSize: 12, color: 'var(--report-muted)' }}>11 min 52 s · auto-generated</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'none' : 'rotate(180deg)' }}><path d="M6 15l6-6 6 6"></path></svg>
          </button>
          {open && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 18px 18px', borderTop: '1px solid #EFEFF1' }}>
              <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: 'var(--report-warn-bg)', color: 'var(--report-warn-fg)', fontSize: 12, lineHeight: 1.45 }}>
                Auto-generated from the call. Names and numbers may be wrong. Not included in your shared report.
              </div>
              {REPORT.transcript.map((t, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: t.who === 'd' ? 'flex-start' : 'flex-end' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--report-muted)' }}>{t.who === 'd' ? 'Disha' : 'You'} · {t.time}</span>
                  <div style={{ maxWidth: '86%', padding: '10px 12px', borderRadius: 12, background: t.who === 'd' ? 'var(--report-tile)' : 'var(--report-accent-bg)', fontSize: 14, lineHeight: 1.5 }}>{t.text}</div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 44, borderRadius: 8, border: '1px solid #D9D9DE', color: 'var(--report-text)', fontSize: 14, fontWeight: 700 }}>Show full transcript</a>
                <button aria-label="Copy transcript" style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid #D9D9DE', background: 'var(--report-card)', color: 'var(--report-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>
                </button>
              </div>
            </div>
          )}
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.alert('This prototype does not wire up the human-counsellor flow.'); }} style={{ display: 'flex', alignItems: 'center', minHeight: 44, fontSize: 14, fontWeight: 700 }}>Talk to a human counsellor</a>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: 'var(--report-muted)' }}>Before you pay anything, check the exact programme and academic session on the UGC-DEB portal.</p>
        </div>

        <button type="button" onClick={onRestart} style={{ alignSelf: 'center', marginTop: 8, fontSize: 13, fontWeight: 700, color: 'var(--report-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Start over
        </button>
      </main>

      {share && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,12,0.55)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 20 }} onClick={() => setShare(false)}>
          <div role="dialog" aria-label="Share your report" className="slide-up" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 20px 32px', borderRadius: '20px 20px 0 0', background: '#fff', color: '#1A1A1A', maxWidth: 430, margin: '0 auto', width: '100%' }}>
            <span style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 2, background: '#D9D9DE' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Share your report</h2>
              <button aria-label="Close" onClick={() => setShare(false)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: '#F6F6F7', color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>
              </button>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#5C5F66' }}>Anyone with the link can see your profile, Disha's pick and why it fits. Useful for talking it through with family.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
              {['Copy link', 'WhatsApp', 'Email', 'PDF'].map((label) => (
                <button key={label} type="button" onClick={() => setShare(false)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minHeight: 44, color: '#1A1A1A', fontSize: 12, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#F6F6F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle></svg>
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 10, background: '#F6F6F7' }}>
              <input id="share-tx" type="checkbox" style={{ width: 20, height: 20, marginTop: 1, accentColor: '#E1251B', flexShrink: 0 }} />
              <label htmlFor="share-tx" style={{ fontSize: 13, lineHeight: 1.45, color: '#1A1A1A' }}>Include the conversation transcript <span style={{ color: '#5C5F66' }}>(off by default, it may contain transcription errors)</span></label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
