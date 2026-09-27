import { useEffect, useRef, useState } from 'react';
import Orb from '../components/Orb.jsx';
import LivePanel from '../components/LivePanel.jsx';
import {
  OPENING_LINE, OPENING_CHIPS, EXPLORE_SCRIPT, HOURS_CHIPS, AFTER_HOURS,
  REVEAL_LINES, AFTER_ACCEPT, USER_ACCEPT_LINE, PANEL_STAGES, PICKS,
} from '../data/script.js';
import { AUDIO } from '../data/audio.js';
import useIsDesktop from '../hooks/useIsDesktop.js';

let uid = 0;
const nextId = () => `m${uid++}`;

function fmtTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
}

export default function ConversationScreen({ onEnd, onFinish }) {
  const [stage, setStage] = useState('opening'); // opening | exploring | thinking | revealed | recommended
  const [messages, setMessages] = useState([{ id: nextId(), kind: 'd', text: OPENING_LINE.text }]);
  const [chips, setChips] = useState(OPENING_CHIPS);
  const [typing, setTyping] = useState(false);
  const [panelStage, setPanelStage] = useState('start');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef([]);
  const endRef = useRef(null);
  // Created once lazily at render time (not in an effect) so React StrictMode's
  // dev-only double-invoke of mount effects can't spawn a second Audio instance
  // and have its cleanup pause() interrupt the real one's playback.
  const audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = new Audio();

  useEffect(() => {
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => () => audioRef.current?.pause(), []);

  // Plays Disha's pre-generated line (Sarvam TTS, voice "ritu") for a script id.
  function speak(id) {
    const src = id && AUDIO[id]?.url;
    const el = audioRef.current;
    if (!src || !el) return;
    el.pause();
    el.src = src;
    el.currentTime = 0;
    el.play().catch(() => {});
  }

  useEffect(() => {
    speak(OPENING_LINE.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function after(ms, fn) {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }

  function pushMessage(kind, text) {
    setMessages((m) => [...m, { id: nextId(), kind, text }]);
  }

  const TYPE_DELAY = 900; // typing-dots duration before a spoken line lands
  const PAUSE_AFTER = 500; // breathing room after a line finishes speaking

  function handleOpeningChip(label) {
    pushMessage('u', label);
    setChips([]);
    setStage('exploring');
    let t = 500;
    EXPLORE_SCRIPT.forEach((item) => {
      if (item.kind === 'd') {
        after(t, () => setTyping(true));
        const speakAt = t + TYPE_DELAY;
        after(speakAt, () => { setTyping(false); pushMessage('d', item.text); speak(item.id); });
        t = speakAt + (AUDIO[item.id]?.ms ?? 1500) + PAUSE_AFTER;
      } else if (item.kind === 'u') {
        after(t, () => pushMessage('u', item.text));
        t += 1100;
      } else if (item.kind === 'x') {
        after(t, () => { pushMessage('x', item.text); setPanelStage('exploring'); });
        t += 900;
      }
    });
    after(t, () => setChips(HOURS_CHIPS));
  }

  function handleHoursChip(label) {
    pushMessage('u', AFTER_HOURS.text);
    setChips([]);
    setStage('thinking');
    setTyping(true);
    after(1700, () => {
      setTyping(false);
      setStage('revealed');
      setPanelStage('revealed');
      let t = 0;
      REVEAL_LINES.forEach((line) => {
        after(t, () => {
          if (line.kind === 'rec') pushMessage('rec', PICKS.mba.name);
          else { pushMessage('d', line.text); speak(line.id); }
        });
        t += line.kind === 'rec' ? 400 : (AUDIO[line.id]?.ms ?? 1500) + PAUSE_AFTER;
      });
    });
  }

  function handleAccept() {
    pushMessage('u', USER_ACCEPT_LINE.text);
    after(500, () => { pushMessage('d', AFTER_ACCEPT.text); speak(AFTER_ACCEPT.id); });
    setStage('recommended');
    setPanelStage('recommended');
    setChatOpen(false);
  }

  const revealOverlay = (stage === 'revealed' || stage === 'recommended') && !chatOpen;
  const accepted = stage === 'recommended';
  const orbMode = typing ? 'connecting' : stage === 'thinking' ? 'connecting' : chips.length || stage === 'opening' ? 'speaking' : 'listening';
  const topMatch = PANEL_STAGES.exploring.matches[0];
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    const listening = !muted && stage !== 'thinking' && stage !== 'opening' && chips.length === 0;
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg)', overflow: 'hidden' }} className="screen-transition">
        <header style={{ height: 68, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid var(--border-2)' }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'var(--card)', color: '#C7C9CE', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              <span>Recording · {fmtTime(elapsed)}</span>
            </span>
            {!accepted && (
              <button type="button" onClick={onEnd} style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 16px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                End conversation
              </button>
            )}
          </div>
        </header>

        <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: 'clamp(280px, 26vw, 360px) minmax(0, 1fr) clamp(340px, 33vw, 460px)', minHeight: 0 }}>
          <aside aria-label="Matches" style={{ borderRight: '1px solid var(--border-2)', overflowY: 'auto' }}>
            <LivePanel stage={panelStage} accepted={accepted} onAccept={handleAccept} reportHref={onFinish} />
          </aside>

          <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 32px' }}>
            <Orb size={280} mode={orbMode} ground="var(--bg)" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {stage === 'thinking' ? 'Disha is thinking…' : accepted ? 'Your recommendation is ready' : muted ? 'Mic off' : 'Disha is speaking'}
              </div>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                {stage === 'thinking' ? 'Give her a second' : accepted ? 'See your report from the panel on the left' : muted ? 'Unmute to keep talking, or switch to chat' : 'Speak anytime to interrupt'}
              </div>
            </div>
            {!accepted && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, paddingTop: 8 }}>
                <button
                  type="button" aria-pressed={muted} onClick={() => setMuted((v) => !v)}
                  style={{ width: 64, height: 64, borderRadius: '50%', border: muted ? '1px dashed var(--divider)' : '1px solid #5A2019', background: muted ? 'var(--card-2)' : 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted ? 'var(--muted)' : 'var(--accent-light)', cursor: 'pointer' }}
                >
                  {muted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18"></path><path d="M9 9v2a3 3 0 0 0 5 2.2"></path><path d="M15 9.3V6a3 3 0 0 0-5.7-1.3"></path><path d="M5 11a7 7 0 0 0 11.5 5.3"></path><path d="M19 11a7 7 0 0 1-.6 2.8"></path><path d="M12 18v3"></path></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
                  )}
                </button>
                <button
                  type="button" aria-label="End conversation" onClick={onEnd}
                  style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>
                </button>
              </div>
            )}
            {!accepted && <p style={{ margin: 0, fontSize: 13, color: 'var(--dim)' }}>Just talk. Prefer typing? Switch to Chat on the right.</p>}
          </main>

          <section aria-label="Conversation" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, borderLeft: '1px solid var(--border-2)', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border-2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 16, fontWeight: 800 }}>Conversation</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>What you and Disha say, word for word</span>
              </div>
              <div role="group" aria-label="Talk or type" style={{ flexShrink: 0, display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: 'var(--card)', border: '1px solid var(--border)' }}>
                <button type="button" aria-pressed="true" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: 'var(--text)', color: 'var(--bg)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
                  <span>Voice</span>
                </button>
                <button type="button" aria-pressed="false" disabled title="Not part of this prototype" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: 'transparent', color: 'var(--dim)', fontSize: 13, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"></path></svg>
                  <span>Chat</span>
                </button>
              </div>
            </div>

            <div style={{ maskImage: 'linear-gradient(to bottom, transparent 0, #000 40px)', flexGrow: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 14, padding: '16px 20px' }}>
              {messages.map((m) => <MessageRow key={m.id} m={m} />)}
              {typing && (
                <div role="status" aria-label="Disha is thinking" style={{ alignSelf: 'flex-start', display: 'flex', gap: 5, padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--card-2)' }}>
                  <span className="dot1" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
                  <span className="dot2" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
                  <span className="dot3" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
                </div>
              )}
              {chips.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {chips.map((c) => (
                    <button
                      key={c} type="button"
                      onClick={() => (stage === 'opening' ? handleOpeningChip(c) : handleHoursChip(c))}
                      style={{ minHeight: 36, padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 16px 16px', padding: '14px 16px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--muted)' }}>
              <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 3, height: 18 }}>
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={listening ? `eq eq${n > 1 ? n : ''}` : ''} style={{ width: 3, height: 18, borderRadius: 2, background: listening ? 'var(--accent-light)' : 'var(--faint)' }} />
                ))}
              </span>
              <span style={{ flexGrow: 1 }}>
                <strong style={{ color: 'var(--text)' }}>
                  {stage === 'thinking' ? 'Disha is thinking…' : muted ? 'Mic off' : listening ? 'Listening…' : 'Disha is speaking'}
                </strong> · Prefer typing? Switch to Chat above.
              </span>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg)', overflow: 'hidden' }} className="screen-transition">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, background: 'var(--card)', color: '#C7C9CE', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
            <span>{fmtTime(elapsed)}</span>
          </span>
          {!accepted && (
            <button type="button" onClick={onEnd} style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
              End
            </button>
          )}
        </div>
      </header>

      {!revealOverlay && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 16px 12px' }}>
          <div style={{ flexShrink: 0, width: 72, height: 72 }}><Orb size={72} mode={orbMode} ground="var(--bg)" /></div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em' }}>
              {stage === 'thinking' ? 'Disha is thinking…' : muted ? 'Mic off' : 'Disha is speaking'}
            </span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              {stage === 'thinking' ? 'Give her a second' : muted ? 'Unmute to keep talking, or switch to chat' : 'Speak anytime to interrupt'}
            </span>
          </div>
        </div>
      )}

      {!revealOverlay && (
        <main style={{
          flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', gap: 12, padding: '12px 16px',
        }}>
          {messages.map((m) => <MessageRow key={m.id} m={m} />)}
          {typing && (
            <div role="status" aria-label="Disha is thinking" style={{ alignSelf: 'flex-start', display: 'flex', gap: 5, padding: '12px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--card-2)' }}>
              <span className="dot1" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
              <span className="dot2" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
              <span className="dot3" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C7C9CE' }} />
            </div>
          )}
          {chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {chips.map((c) => (
                <button
                  key={c} type="button"
                  onClick={() => (stage === 'opening' ? handleOpeningChip(c) : handleHoursChip(c))}
                  style={{ minHeight: 36, padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </main>
      )}

      {revealOverlay && (
        <RevealPanel
          stage={stage}
          accepted={accepted}
          onMinimize={() => setChatOpen(true)}
          onAccept={handleAccept}
          onFinish={onFinish}
        />
      )}

      {!revealOverlay && (
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, padding: '0 0 24px', borderRadius: '20px 20px 0 0', background: 'var(--surface)', borderTop: '1px solid var(--border-2)', boxShadow: '0 -16px 32px -16px rgba(0,0,0,0.8)' }}>
          {stage === 'opening' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 16px 0' }}>
              <span style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', border: '1.5px dashed var(--divider)' }} />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Matches appear once Disha knows a little about you</span>
              </span>
            </div>
          ) : chatOpen ? (
            <BackToPickBar stage={stage} onExpand={() => setChatOpen(false)} onFinish={onFinish} />
          ) : (
            <button
              type="button" aria-expanded={sheetOpen} onClick={() => setSheetOpen(true)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, padding: '8px 16px 0', border: 'none', background: 'transparent', color: 'var(--text)', textAlign: 'left', cursor: 'pointer' }}
            >
              <span style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>1</span>
                <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>Top match so far</span>
                  <span style={{ fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topMatch.name}</span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--good)', fontSize: 11, fontWeight: 800 }}>{topMatch.badge}</span>
                <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--accent-light)' }}>
                  <span>All 3</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6"></path></svg>
                </span>
              </span>
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 12px', padding: 6, borderRadius: 999, border: '1px solid var(--border)', background: 'var(--card)' }}>
            <button
              type="button" aria-pressed={muted} onClick={() => setMuted((v) => !v)}
              style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: muted ? '1px dashed var(--divider)' : '1px solid #5A2019', background: muted ? 'var(--card-2)' : 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted ? 'var(--muted)' : 'var(--accent-light)', cursor: 'pointer' }}
            >
              {muted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18"></path><path d="M9 9v2a3 3 0 0 0 5 2.2"></path><path d="M15 9.3V6a3 3 0 0 0-5.7-1.3"></path><path d="M5 11a7 7 0 0 0 11.5 5.3"></path><path d="M19 11a7 7 0 0 1-.6 2.8"></path><path d="M12 18v3"></path></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
              )}
            </button>
            <span role="status" style={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#C7C9CE' }}>
              <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 3, height: 18 }}>
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={muted ? '' : `eq eq${n > 1 ? n : ''}`} style={{ width: 3, height: 18, borderRadius: 2, background: muted ? 'var(--faint)' : 'var(--accent-light)' }} />
                ))}
              </span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {muted ? 'Mic off' : stage === 'thinking' ? 'Disha is thinking…' : stage === 'opening' || chips.length > 0 ? 'Disha is speaking' : 'Listening…'}
              </span>
            </span>
            <button type="button" disabled style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: '#26262C', color: 'var(--text)', fontSize: 13, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }} title="Chat mode is not part of this prototype">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"></path></svg>
              <span>Chat</span>
            </button>
          </div>
        </div>
      )}

      {sheetOpen && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10 }} onClick={() => setSheetOpen(false)}>
          <div role="dialog" aria-label="Matches" className="slide-up" onClick={(e) => e.stopPropagation()} style={{ height: '78%', display: 'flex', flexDirection: 'column', borderRadius: '20px 20px 0 0', background: 'var(--surface)', borderTop: '1px solid var(--border-2)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 0 20px' }}>
              <span style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
              <button aria-label="Close matches" onClick={() => setSheetOpen(false)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
              </button>
            </div>
            <LivePanel stage={panelStage} accepted={accepted} />
          </div>
        </div>
      )}
    </div>
  );
}

function MessageRow({ m }) {
  if (m.kind === 'd') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)' }}><span style={{ color: 'var(--accent-light)' }}>Disha</span> · Spoken</span>
        <p style={{ margin: 0, maxWidth: '88%', padding: '10px 13px', borderRadius: '4px 14px 14px 14px', background: 'var(--card-2)', color: '#EDEDEF', fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
      </div>
    );
  }
  if (m.kind === 'u') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--dim)' }}>You · Spoken</span>
        <p style={{ margin: 0, maxWidth: '84%', padding: '10px 13px', borderRadius: '14px 4px 14px 14px', background: 'var(--text)', color: 'var(--bg)', fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
      </div>
    );
  }
  if (m.kind === 'x') {
    return (
      <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 600, color: 'var(--dim)' }}>
        <span style={{ flexGrow: 1, height: 1, background: 'var(--border-2)' }} />
        <span>{m.text}</span>
        <span style={{ flexGrow: 1, height: 1, background: 'var(--border-2)' }} />
      </div>
    );
  }
  if (m.kind === 'rec') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 14, borderRadius: 14, background: '#141418', border: '1.5px solid var(--accent)' }}>
        <span style={{ alignSelf: 'flex-start', color: 'var(--accent-light)', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Disha's pick</span>
        <span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3 }}>{m.text}</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>[University name] · [₹ fee] · [months]</span>
      </div>
    );
  }
  return null;
}

function BackToPickBar({ stage, onExpand, onFinish }) {
  const label = stage === 'recommended' ? 'Report' : 'Disha’s pick';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '6px 12px 0' }}>
      <button type="button" onClick={onExpand} style={{ alignSelf: 'center', width: 64, height: 16, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <span style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 4 }}>
        <button type="button" onClick={onExpand} style={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: 0, border: 'none', background: 'transparent', color: 'var(--text)', textAlign: 'left', cursor: 'pointer' }}>
          <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>1</span>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>Disha's pick</span>
            <span style={{ fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PICKS.mba.name}</span>
          </span>
        </button>
        {stage === 'recommended' && (
          <button type="button" onClick={onFinish} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
            {label}
          </button>
        )}
      </div>
    </div>
  );
}

function RevealPanel({ stage, accepted, onMinimize, onAccept, onFinish }) {
  const pick = PICKS.mba;
  const also = PANEL_STAGES.revealed.matches;
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4, padding: '0 16px 24px', borderRadius: '20px 20px 0 0', background: 'var(--surface)', borderTop: '1px solid var(--border-2)', boxShadow: '0 -16px 32px -16px rgba(0,0,0,0.8)' }}>
      <button type="button" aria-label="Minimise and show the conversation" onClick={onMinimize} style={{ flexShrink: 0, height: 24, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <span style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
      </button>
      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flexShrink: 0, width: 48, height: 48 }}><Orb size={48} mode={accepted ? 'listening' : 'speaking'} ground="var(--bg)" /></div>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>Disha's recommendation</span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{accepted ? 'Based on your 11-minute conversation' : "She's walking you through it" }</span>
          </div>
        </div>

        <article className="rise" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14, padding: 18, borderRadius: 20, background: '#141418', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', boxShadow: '0 30px 60px -30px rgba(225,37,27,0.35)' }}>
          <span style={{ alignSelf: 'flex-start', color: 'var(--accent-light)', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{pick.badge}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <h2 style={{ margin: 0, fontSize: 23, fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{pick.name}</h2>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>[University name]</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
            {[['Fee', '[₹ fee]'], ['Duration', '[months]'], ['Weekly', '[hrs]']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 10, borderRadius: 10, background: 'var(--card-2)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontSize: 14, fontWeight: 800 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>Why it fits you</span>
            {pick.reasons.map((r) => (
              <div key={r} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.5, color: '#EDEDEF' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-bg)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--warn-bg)', color: 'var(--warn-fg)', fontSize: 13, lineHeight: 1.45 }}>
            <strong>The trade-off:</strong> {pick.trade}
          </div>
        </article>

        <section style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Also consider</h3>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>4 more options</span>
          </div>
          {also.map((o, i) => (
            <div key={o.name} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 14, background: '#141418', border: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--card-2)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{i + 2}</span>
              <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>{o.name}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>[University name] · [₹ fee] · [months]</span>
                <span style={{ fontSize: 13, lineHeight: 1.45, color: '#C7C9CE' }}>{o.reason}</span>
              </div>
            </div>
          ))}
        </section>
      </div>

      {accepted ? (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button type="button" onClick={onFinish} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 14, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></svg>
            <span>See my report</span>
          </button>
          <button type="button" onClick={onMinimize} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 16px', borderRadius: 14, border: '1px solid var(--border)', background: '#141418', color: 'var(--text)', fontSize: 14, fontWeight: 700, textAlign: 'left', cursor: 'pointer' }}>
            <span style={{ color: 'var(--accent-light)', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
            </span>
            <span style={{ flexGrow: 1 }}>Ask Disha more</span>
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button type="button" onClick={onAccept} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 14, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            That feels right
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" disabled title="Not part of this prototype" style={{ flexGrow: 1, height: 46, borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>Not quite</button>
            <button type="button" disabled title="Not part of this prototype" style={{ flexGrow: 1, height: 46, borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 700, opacity: 0.6, cursor: 'not-allowed' }}>Still not right</button>
          </div>
        </div>
      )}
    </div>
  );
}
