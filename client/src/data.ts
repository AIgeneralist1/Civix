import type { NewsBrief, Question, Source } from './types'

export const minimumStrengthThreshold = 2

export const sources: Source[] = [
  {
    id: 'the-hindu',
    name: 'The Hindu',
    trustNote: 'Deep policy and editorial coverage suited for UPSC current affairs.',
    ingestionMode: 'RSS',
  },
  {
    id: 'indian-express',
    name: 'The Indian Express',
    trustNote: 'Strong explainer coverage for governance and institutions.',
    ingestionMode: 'RSS',
  },
  {
    id: 'business-standard',
    name: 'Business Standard',
    trustNote: 'Useful for economy, policy, inflation, and markets context.',
    ingestionMode: 'API',
  },
  {
    id: 'livemint',
    name: 'Mint',
    trustNote: 'Good source for business, taxation, and reform-oriented analysis.',
    ingestionMode: 'Licensed Feed',
  },
  {
    id: 'down-to-earth',
    name: 'Down To Earth',
    trustNote: 'High-value environment and climate coverage.',
    ingestionMode: 'Compliant Scraping',
  },
]

export const briefs: NewsBrief[] = [
  {
    id: 'brief-1',
    sourceId: 'the-hindu',
    headline: 'Finance Commission consultations reopen debate on fiscal federalism',
    summary:
      'States have pushed for a revised tax devolution formula and more predictable tied grants for health and education spending.',
    category: 'Polity',
    importance: 'High',
    publishedAt: '2026-04-13',
  },
  {
    id: 'brief-2',
    sourceId: 'indian-express',
    headline: 'India expands green hydrogen corridor planning for industrial clusters',
    summary:
      'The policy focus is on enabling clean energy supply chains, reducing import dependence, and supporting long-term decarbonisation.',
    category: 'Environment',
    importance: 'High',
    publishedAt: '2026-04-13',
  },
  {
    id: 'brief-3',
    sourceId: 'business-standard',
    headline: 'Retail inflation eases while food volatility remains a policy concern',
    summary:
      'Lower headline inflation has improved monetary room, but food price shocks still complicate durable price stability.',
    category: 'Economy',
    importance: 'High',
    publishedAt: '2026-04-13',
  },
  {
    id: 'brief-4',
    sourceId: 'livemint',
    headline: 'Semiconductor incentive push links manufacturing with strategic technology policy',
    summary:
      'The policy debate has shifted from subsidy alone to ecosystem readiness, talent development, and trusted supply chains.',
    category: 'Science and Technology',
    importance: 'Medium',
    publishedAt: '2026-04-13',
  },
  {
    id: 'brief-5',
    sourceId: 'down-to-earth',
    headline: 'Wetland conservation review highlights the role of community stewardship',
    summary:
      'Policy observers point to ecological services, flood control, biodiversity support, and local participation as central themes.',
    category: 'Geography',
    importance: 'Medium',
    publishedAt: '2026-04-13',
  },
]

export const questions: Question[] = [
  {
    id: 'q1',
    articleId: 'brief-1',
    category: 'Polity',
    difficulty: 'Medium',
    question:
      'Which of the following best explains the constitutional significance of the Finance Commission in India?',
    options: [
      'It directly passes the annual Union Budget in Parliament.',
      'It recommends the distribution of financial resources between the Union and the States.',
      'It supervises the borrowing programme of State governments on behalf of the RBI.',
      'It audits all expenditure incurred from the Consolidated Fund of India.',
    ],
    correctIndex: 1,
    explanation:
      'The Finance Commission is a constitutional body that recommends tax devolution and grants-in-aid between the Union and the States.',
  },
  {
    id: 'q2',
    articleId: 'brief-2',
    category: 'Environment',
    difficulty: 'Hard',
    question:
      'The development of a green hydrogen corridor is most directly associated with which one of the following objectives?',
    options: [
      'Replacing all thermal power generation in the short run',
      'Creating integrated infrastructure for production, storage, and industrial use of clean hydrogen',
      'Expanding crude oil refining capacity near ports',
      'Substituting hydropower for solar energy in grid balancing',
    ],
    correctIndex: 1,
    explanation:
      'Hydrogen corridors focus on end-to-end clean hydrogen logistics and industrial use, not immediate replacement of all thermal generation.',
  },
  {
    id: 'q3',
    articleId: 'brief-3',
    category: 'Economy',
    difficulty: 'Medium',
    question:
      'Why can food price volatility remain a challenge even when headline retail inflation moderates?',
    options: [
      'Because food inflation is completely excluded from inflation measurement',
      'Because volatile food prices can quickly reverse gains in overall inflation and affect household expectations',
      'Because retail inflation depends only on exchange rate changes',
      'Because monetary policy has no relationship with inflation expectations',
    ],
    correctIndex: 1,
    explanation:
      'Food carries significant weight in household consumption. Volatility can raise inflation expectations and weaken durable disinflation.',
  },
  {
    id: 'q4',
    articleId: 'brief-4',
    category: 'Science and Technology',
    difficulty: 'Hard',
    question:
      'In the context of semiconductor policy, which factor is most critical for moving from subsidy-led announcements to actual manufacturing scale?',
    options: [
      'Availability of a single large domestic buyer',
      'A one-time customs duty waiver on all electronics imports',
      'Ecosystem readiness including skilled labour, supplier depth, power reliability, and trusted logistics',
      'Replacing all imported chip designs with open-source designs immediately',
    ],
    correctIndex: 2,
    explanation:
      'Semiconductor manufacturing depends on a deep ecosystem, not just financial incentives.',
  },
  {
    id: 'q5',
    articleId: 'brief-5',
    category: 'Geography',
    difficulty: 'Easy',
    question:
      'Wetlands are often considered ecologically valuable because they can perform which of the following functions?',
    options: [
      'Only support inland navigation',
      'Flood moderation, habitat support, and groundwater recharge',
      'Prevent all forms of soil erosion in uplands',
      'Replace forests in carbon sequestration roles entirely',
    ],
    correctIndex: 1,
    explanation:
      'Wetlands provide multiple ecosystem services including flood buffering, biodiversity support, and hydrological regulation.',
  },
  {
    id: 'q6',
    articleId: 'brief-1',
    category: 'Polity',
    difficulty: 'Hard',
    question:
      'Which one of the following would most likely strengthen cooperative fiscal federalism?',
    options: [
      'Reducing all untied transfers to States',
      'Increasing transparency and predictability in devolution and grant criteria',
      'Eliminating inter-state fiscal equalisation principles',
      'Converting all centrally sponsored schemes into discretionary transfers',
    ],
    correctIndex: 1,
    explanation:
      'Cooperative fiscal federalism benefits from predictable transfers, transparent criteria, and trust in institutional sharing arrangements.',
  },
]
