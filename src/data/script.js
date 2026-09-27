// Content extracted from the "Disha counsellor" design mockups (Voice.dc.html,
// LivePanel.dc.html, Recommendation.dc.html). Names in [Brackets] were placeholders
// in the source design and are kept as-is.

export const NAMES = {
  MBA: 'Online MBA · Business Analytics',
  DS: 'PG Diploma in Data Science',
  MSC: 'MSc in Data Analytics',
  PM: 'PG Certificate in Product Management',
  ML: 'Executive PG in Machine Learning & AI',
};

export const PICKS = {
  mba: {
    badge: 'Best fit for you',
    name: NAMES.MBA,
    trade: 'some weeks will ask for more than your 8 hours.',
    reasons: [
      'You said the best part of testing is finding out why something broke. Analytics is that, at business scale.',
      'It builds on your 4 years in IT instead of starting over.',
    ],
  },
};

// The scripted back-and-forth for the "exploring" stage, in order.
// kind: d = Disha, u = user, x = live-match update toast
export const OPENING_LINE = {
  kind: 'd',
  text: "Hi Priya, I'm Disha, YourDegree's AI counsellor. Just talk, like you would on a call. What's brought you here today?",
};

export const OPENING_CHIPS = ['Switch fields', 'Grow in my role', 'Just finished studying', 'Coming back after a break'];

export const EXPLORE_SCRIPT = [
  { kind: 'u', text: "I've been in QA for four years and I feel stuck. Same test cases every sprint." },
  { kind: 'd', text: 'Four years of the same test cases. That would wear anyone down. What part of the work still feels good?' },
  { kind: 'u', text: 'When something fails and I get to dig in and find out why.' },
  { kind: 'x', text: 'Matches updated · MBA moved to #1' },
  { kind: 'd', text: 'That detective instinct is what data roles run on. Roughly how many hours a week could you give to studying?' },
];

export const HOURS_CHIPS = ['Under 5 hrs', '5–10', '10–15', '15+'];

export const AFTER_HOURS = { kind: 'u', text: 'Maybe eight hours, mostly on weekends.' };

export const REVEAL_LINES = [
  {
    kind: 'd',
    text: "Priya, here's what I'd suggest: the Online MBA in Business Analytics. It builds on your four years instead of starting over, and turns the part you enjoy, finding out why things break, into the job.",
  },
  { kind: 'rec' },
  { kind: 'd', text: 'The honest trade-off: some weeks will ask for more than your eight hours. How does that sit with you?' },
];

export const AFTER_ACCEPT = {
  kind: 'd',
  text: 'Good. Your report has everything we discussed, including the trade-off, so you can come back to it or share it with anyone deciding with you.',
};

export const USER_ACCEPT_LINE = { kind: 'u', text: 'That feels right.' };

// LivePanel stages, in the order the happy path plays them.
export const PANEL_STAGES = {
  start: {
    heading: 'Matches so far',
    pill: 'Live',
    intro: 'Updating as you talk. Disha gives her final pick at the end.',
    matches: [],
    footer: 'Nothing is recommended until Disha understands you.',
  },
  exploring: {
    heading: 'Matches so far',
    pill: 'Live',
    intro: 'Updating as you talk. Disha gives her final pick at the end.',
    matches: [
      { name: NAMES.MBA, badge: '↑ Moved up', kind: 'up', reason: 'Because you said the fun part is finding out why something broke.' },
      { name: NAMES.DS, badge: 'New', kind: 'new', reason: 'Because you want to move closer to data work.' },
      { name: NAMES.PM, badge: '', kind: '', reason: '[Reason tied to what Priya said]' },
    ],
    footer: 'Matches sharpen once Disha knows your weekly time and budget.',
  },
  revealed: {
    heading: "Disha's pick",
    pill: 'Speaking',
    pick: 'mba',
    intro: "She's walking you through it now.",
    listLabel: 'Also consider',
    matches: [
      { name: NAMES.DS, reason: 'Deeper on data, if you want to go specialist rather than broad.' },
      { name: NAMES.MSC, reason: "A full master's, if having the degree matters for your next move." },
      { name: NAMES.PM, reason: '[Reason tied to what Priya said]' },
      { name: NAMES.ML, reason: '[Reason tied to what Priya said]' },
    ],
    footer: 'Your report has the full reasoning for all five.',
  },
  recommended: {
    heading: "Disha's pick",
    pill: 'Final',
    pick: 'mba',
    done: true,
    intro: 'Based on your 11-minute conversation.',
    listLabel: 'Also consider',
    matches: [
      { name: NAMES.DS, reason: 'Deeper on data, if you want to go specialist rather than broad.' },
      { name: NAMES.MSC, reason: "A full master's, if having the degree matters for your next move." },
      { name: NAMES.PM, reason: '[Reason tied to what Priya said]' },
      { name: NAMES.ML, reason: '[Reason tied to what Priya said]' },
    ],
    footer: 'Your report has the full reasoning for all five.',
  },
};

// Full recommendation report content (Recommendation.dc.html)
export const REPORT = {
  dateLine: '23 Sep 2026 · 11 min call',
  headline: "Priya, here's where you should start",
  take: "You don't want to leave tech. You want to stop repeating it. Each of these builds on your four years instead of starting you over.",
  programmes: [
    {
      name: NAMES.MBA,
      uni: '[University name]',
      fee: '[₹ fee]',
      duration: '[months]',
      effort: '[hrs]',
      reasons: [
        'You said the best part of testing is finding out why something broke. Analytics is that, at business scale.',
        'Builds on your 4 years in IT services instead of starting over.',
        '[How the format fits your 8 hours a week]',
      ],
      tradeoff: '[Weekly effort against your 8 hours, or fee against your budget]',
    },
    {
      name: NAMES.DS,
      uni: '[University name]',
      fee: '[₹ fee]',
      duration: '[months]',
      effort: '[hrs]',
      reasons: ['Goes deeper on the data work you said you enjoy.', '[Why it suits someone moving out of manual testing]'],
    },
    {
      name: NAMES.MSC,
      uni: '[University name]',
      fee: '[₹ fee]',
      duration: '[months]',
      effort: '[hrs]',
      reasons: ["A full master's, if having the degree matters for your next move.", '[Fit against your budget]'],
    },
    {
      name: NAMES.PM,
      uni: '[University name]',
      fee: '[₹ fee]',
      duration: '[months]',
      effort: '[hrs]',
      reasons: ['Matches the "building a system that runs smoothly" side you picked.', '[Time commitment against your 8 hours]'],
    },
    {
      name: NAMES.ML,
      uni: '[University name]',
      fee: '[₹ fee]',
      duration: '[months]',
      effort: '[hrs]',
      reasons: ['[Why it fits, tied to what Priya said]', '[Time commitment against your 8 hours]'],
    },
  ],
  profile: [
    { label: 'Situation', value: 'Working professional' },
    { label: 'Role', value: 'QA analyst' },
    { label: 'Experience', value: '4 years, IT services' },
    { label: 'Qualification', value: 'Graduate' },
    { label: 'Time', value: '8 hrs a week' },
    { label: 'Budget', value: '[₹ budget]' },
  ],
  goal: '"[Career goal as Priya said it]"',
  worry: "“I'll start and not finish. I've done that with online courses before.”",
  workStyle: 'Digging into data to solve a tricky problem',
  transcript: [
    { who: 'd', time: '00:04', text: "Hi Priya, I'm Disha, YourDegree's AI counsellor. What's brought you here today?" },
    { who: 'u', time: '00:12', text: "I've been in QA for four years and I feel stuck. Same test cases every sprint." },
    { who: 'd', time: '00:26', text: 'Four years of the same test cases. That would wear anyone down.' },
    { who: 'u', time: '00:34', text: 'The only fun part is when something fails and I get to find out why.' },
    { who: 'd', time: '00:47', text: 'What worries you most about doing a degree right now?' },
    { who: 'u', time: '00:55', text: "That I'll start and not finish. I've done that with online courses before." },
  ],
};
