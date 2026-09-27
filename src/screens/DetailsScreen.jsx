import { useState } from 'react';
import Orb from '../components/Orb.jsx';
import useIsDesktop from '../hooks/useIsDesktop.js';

const HOW_STEPS = [
  { title: 'Getting to know you', sub: 'Your role or studies, experience, and why now' },
  { title: 'What you want next', sub: 'Your goal, and the work you enjoy' },
  { title: 'What fits your life', sub: 'Qualification, weekly study time, budget and any worries' },
  { title: "Disha's recommendation", sub: '1 best fit and 4 more to consider, or a career roadmap if a degree won’t help' },
  { title: 'Your report', sub: 'Everything you discussed, to download or share' },
];

export default function DetailsScreen({ onStart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [how, setHow] = useState(false);
  const [touched, setTouched] = useState(false);
  const isDesktop = useIsDesktop();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^\d{10}$/.test(phone);
  const ready = name.trim().length > 0 && emailValid && phoneValid && consent;
  const showErrors = touched && !ready;

  function submit() {
    setTouched(true);
    if (ready) onStart({ name: name.trim() });
  }

  const fields = (
    <>
      <Field label="Full name">
        <input
          type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="As you'd like Disha to call you" style={inputStyle()}
        />
      </Field>
      <Field label="Email" error={showErrors && !emailValid ? 'Enter a valid email, like name@example.com' : null}>
        <input
          type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Your report is sent here" style={inputStyle(showErrors && !emailValid)}
        />
      </Field>
      <Field label="Mobile number" error={showErrors && !phoneValid ? 'Enter a 10-digit mobile number' : null}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ height: 50, padding: '0 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-2)', display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600 }}>+91</div>
          <input
            type="tel" inputMode="numeric" autoComplete="tel-national" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10-digit number" style={{ ...inputStyle(showErrors && !phoneValid), flexGrow: 1, minWidth: 0 }}
          />
        </div>
      </Field>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <input
            id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
            style={{ width: 20, height: 20, marginTop: 2, accentColor: 'var(--accent)', flexShrink: 0 }}
          />
          <label htmlFor="consent" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>
            I agree to this conversation being recorded to prepare my recommendations, and to YourDegree contacting me about them.
          </label>
        </div>
        {showErrors && !consent && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 30, fontSize: 12, fontWeight: 600, color: '#FF7A70' }}>
            Tick this to continue
          </span>
        )}
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--bg)' }} className="screen-transition">
        <header style={{ display: 'flex', alignItems: 'center', padding: '20px 80px', borderBottom: '1px solid var(--border-2)' }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
        </header>
        <main style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 96, alignItems: 'center', padding: '0 80px 48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ width: 112, height: 112, borderRadius: '50%', overflow: 'hidden' }}>
              <Orb size={112} mode="listening" ground="var(--bg)" />
            </div>
            <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Talk it through with <span style={{ color: 'var(--accent)' }}>Disha</span>
            </h1>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: 'var(--muted)' }}>
              Talk with YourDegree's AI career counsellor, or switch to chat. Matching programmes appear as you talk, and she ends with her recommendation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <button
                type="button" aria-expanded={how} onClick={() => setHow((h) => !h)}
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, minHeight: 40, padding: '0 14px 0 12px', borderRadius: 999, border: '1px solid var(--border)', background: how ? 'var(--card-2)' : 'transparent', color: '#EDEDEF', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></svg>
                <span>How it works</span>
                <span style={{ fontWeight: 600, color: 'var(--dim)' }}>5 steps</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: how ? 'rotate(180deg)' : 'none' }}><path d="M6 9l6 6 6-6"></path></svg>
              </button>
              {how && (
                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {HOW_STEPS.map((step, i) => (
                    <li key={step.title} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', border: '1.5px solid var(--divider)', color: '#C7C9CE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 1 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{step.title}</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--muted)' }}>{step.sub}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <form
            noValidate
            onSubmit={(e) => { e.preventDefault(); submit(); }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 40, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border-2)' }}
          >
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>Before we start</div>
            {fields}
            <button
              type="button" onClick={submit}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 56,
                borderRadius: 8, border: 'none', cursor: 'pointer',
                background: ready ? 'var(--accent)' : '#26262C', color: ready ? '#FFFFFF' : 'var(--dim)',
                fontSize: 16, fontWeight: 700,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
              <span>Start conversation</span>
            </button>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: 'var(--muted)', textAlign: 'center' }}>
              Voice by default, switch to chat anytime. Disha is an AI, not a person.
            </p>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--bg)' }} className="screen-transition">
      <header style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-2)' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>YourDegree</div>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px 28px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden' }}>
            <Orb size={88} mode="listening" ground="var(--bg)" />
          </div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            Talk it through with Disha
          </h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>
            Talk with YourDegree's AI career counsellor, or switch to chat. Matching programmes appear as you go, and you get a final recommendation at the end.
          </p>
        </div>

        <button
          type="button"
          aria-expanded={how}
          onClick={() => setHow((h) => !h)}
          style={{
            alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, minHeight: 40,
            padding: '0 14px 0 12px', borderRadius: 999, border: '1px solid var(--border)',
            background: how ? 'var(--card-2)' : 'transparent', color: '#EDEDEF', fontSize: 13, fontWeight: 700,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></svg>
          <span>How it works</span>
          <span style={{ fontWeight: 600, color: 'var(--dim)' }}>5 steps</span>
        </button>

        <form
          noValidate
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Field label="Full name">
            <input
              type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="As you'd like Disha to call you" style={inputStyle()}
            />
          </Field>
          <Field label="Email" error={showErrors && !emailValid ? 'Enter a valid email, like name@example.com' : null}>
            <input
              type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your report is sent here" style={inputStyle(showErrors && !emailValid)}
            />
          </Field>
          <Field label="Mobile number" error={showErrors && !phoneValid ? 'Enter a 10-digit mobile number' : null}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ height: 50, padding: '0 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card-2)', display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600 }}>+91</div>
              <input
                type="tel" inputMode="numeric" autoComplete="tel-national" value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit number" style={{ ...inputStyle(showErrors && !phoneValid), flexGrow: 1, minWidth: 0 }}
              />
            </div>
          </Field>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input
                id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                style={{ width: 20, height: 20, marginTop: 2, accentColor: 'var(--accent)', flexShrink: 0 }}
              />
              <label htmlFor="consent" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>
                I agree to this conversation being recorded to prepare my recommendations, and to YourDegree contacting me about them.
              </label>
            </div>
            {showErrors && !consent && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 30, fontSize: 12, fontWeight: 600, color: '#FF7A70' }}>
                Tick this to continue
              </span>
            )}
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
          <button
            type="button" onClick={submit}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 54,
              borderRadius: 8, border: 'none', cursor: 'pointer',
              background: ready ? 'var(--accent)' : '#26262C', color: ready ? '#FFFFFF' : 'var(--dim)',
              fontSize: 16, fontWeight: 700,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg>
            <span>Start conversation</span>
          </button>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: 'var(--muted)', textAlign: 'center' }}>
            Voice by default, switch to chat anytime. Disha is an AI, not a person.
          </p>
        </div>
      </main>

      {how && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 20 }} onClick={() => setHow(false)}>
          <div
            role="dialog" aria-label="How it works" onClick={(e) => e.stopPropagation()}
            className="slide-up"
            style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 20px 28px', borderRadius: '20px 20px 0 0', background: 'var(--surface)', borderTop: '1px solid var(--border-2)', maxWidth: 430, margin: '0 auto', width: '100%' }}
          >
            <span style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, background: 'var(--divider)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>How it works</h2>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Disha asks about these, in this order</span>
              </div>
              <button type="button" aria-label="Close" onClick={() => setHow(false)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>
              </button>
            </div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {HOW_STEPS.map((step, i) => (
                <li key={step.title} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', border: '1.5px solid var(--divider)', color: '#C7C9CE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 1 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{step.title}</span>
                    <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--muted)' }}>{step.sub}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 700 }}>{label}</label>
      {children}
      {error && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#FF7A70' }}>{error}</span>
      )}
    </div>
  );
}

function inputStyle(error) {
  return {
    height: 50, padding: '0 14px', borderRadius: 8, background: 'var(--card)', fontSize: 15,
    color: 'var(--text)', border: error ? '1.5px solid #FF7A70' : '1px solid var(--border)', outline: 'none',
  };
}
