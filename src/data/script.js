// Content extracted from the "Disha counsellor" design mockups (Voice.dc.html,
// LivePanel.dc.html, Recommendation.dc.html). Fictional university names, fees
// and durations fill in what were originally [bracketed] design placeholders —
// plausible sample data for a prototype, not real institutions or pricing.

export const NAMES = {
  MBA: 'Online MBA · Business Analytics',
  DS: 'PG Diploma in Data Science',
  MSC: 'MSc in Data Analytics',
  PM: 'PG Certificate in Product Management',
  ML: 'Executive PG in Machine Learning & AI',
};

export const PROGRAMME_DETAILS = {
  [NAMES.MBA]: { uni: 'Ridgefield Global University', fee: '₹2,80,000', duration: '24 months', effort: '10–12 hrs/wk' },
  [NAMES.DS]: { uni: 'Meridian Institute of Technology', fee: '₹1,45,000', duration: '11 months', effort: '8–10 hrs/wk' },
  [NAMES.MSC]: { uni: 'Northbridge University', fee: '₹3,20,000', duration: '24 months', effort: '12 hrs/wk' },
  [NAMES.PM]: { uni: 'Elevate School of Management', fee: '₹95,000', duration: '6 months', effort: '6 hrs/wk' },
  [NAMES.ML]: { uni: 'Vantage Institute of AI', fee: '₹2,10,000', duration: '12 months', effort: '10 hrs/wk' },
};

export const PICKS = {
  mba: {
    badge: 'Best fit for you',
    name: NAMES.MBA,
    ...PROGRAMME_DETAILS[NAMES.MBA],
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
  id: 'opening',
  text: "Hi Priya, I'm Disha, YourDegree's AI counsellor. Just talk, like you would on a call. What's brought you here today?",
};

export const OPENING_CHIPS = ['Switch fields', 'Grow in my role', 'Just finished studying', 'Coming back after a break'];

export const EXPLORE_SCRIPT = [
  { kind: 'u', text: "I've been in QA for four years and I feel stuck. Same test cases every sprint." },
  { kind: 'd', id: 'explore-1', text: 'Four years of the same test cases. That would wear anyone down. What part of the work still feels good?' },
  { kind: 'u', text: 'When something fails and I get to dig in and find out why.' },
  { kind: 'x', text: 'Matches updated · MBA moved to #1' },
  { kind: 'd', id: 'explore-2', text: 'That detective instinct is what data roles run on. Roughly how many hours a week could you give to studying?' },
];

export const HOURS_CHIPS = ['Under 5 hrs', '5–10', '10–15', '15+'];

export const AFTER_HOURS = { kind: 'u', text: 'Maybe eight hours, mostly on weekends.' };

export const REVEAL_LINES = [
  {
    kind: 'd',
    id: 'reveal-1',
    text: "Priya, here's what I'd suggest: the Online MBA in Business Analytics. It builds on your four years instead of starting over, and turns the part you enjoy, finding out why things break, into the job.",
  },
  { kind: 'rec' },
  { kind: 'd', id: 'reveal-2', text: 'The honest trade-off: some weeks will ask for more than your eight hours. How does that sit with you?' },
];

export const AFTER_ACCEPT = {
  kind: 'd',
  id: 'after-accept',
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
      { name: NAMES.PM, badge: '', kind: '', reason: 'Because you like owning a problem end-to-end, not just testing it.' },
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
      { name: NAMES.PM, reason: "If you'd rather shape the roadmap than dig into the data yourself." },
      { name: NAMES.ML, reason: 'For going more technical — building the models instead of interpreting them.' },
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
      { name: NAMES.PM, reason: "If you'd rather shape the roadmap than dig into the data yourself." },
      { name: NAMES.ML, reason: 'For going more technical — building the models instead of interpreting them.' },
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
      ...PROGRAMME_DETAILS[NAMES.MBA],
      reasons: [
        'You said the best part of testing is finding out why something broke. Analytics is that, at business scale.',
        'Builds on your 4 years in IT services instead of starting over.',
        'The weekend-heavy format fits your 8 hours a week better than a weekday-only course would.',
      ],
      tradeoff: 'Some weeks, especially around exams, will ask for more than your usual 8 hours.',
    },
    {
      name: NAMES.DS,
      ...PROGRAMME_DETAILS[NAMES.DS],
      reasons: ['Goes deeper on the data work you said you enjoy.', 'QA-to-data-science is one of the most common moves we see — your root-cause habit transfers directly.'],
    },
    {
      name: NAMES.MSC,
      ...PROGRAMME_DETAILS[NAMES.MSC],
      reasons: ["A full master's, if having the degree matters for your next move.", "It costs more than the MBA, so it's worth it mainly if the master's title itself matters for where you go next."],
    },
    {
      name: NAMES.PM,
      ...PROGRAMME_DETAILS[NAMES.PM],
      reasons: ['Matches the "building a system that runs smoothly" side you picked.', "At 6 hours a week it's the lightest option here — easiest to finish alongside a full-time job."],
    },
    {
      name: NAMES.ML,
      ...PROGRAMME_DETAILS[NAMES.ML],
      reasons: ['Goes further technical than the MBA — worth it if you want to build the models, not just read their output.', 'Closer to your 8 hours a week than the MSc, but some weeks will still run over.'],
    },
  ],
  profile: [
    { label: 'Situation', value: 'Working professional' },
    { label: 'Role', value: 'QA analyst' },
    { label: 'Experience', value: '4 years, IT services' },
    { label: 'Qualification', value: 'Graduate' },
    { label: 'Time', value: '8 hrs a week' },
    { label: 'Budget', value: '₹2,50,000' },
  ],
  goal: '"Move into a proper data role without starting my career over"',
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
