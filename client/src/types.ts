export type Category =
  | 'Polity'
  | 'Economy'
  | 'International Relations'
  | 'Environment'
  | 'Science and Technology'
  | 'History and Culture'
  | 'Geography'
  | 'Government Schemes'
  | 'Awards / Reports / Indices'

export type Source = {
  id: string
  name: string
  trustNote: string
  ingestionMode: 'API' | 'RSS' | 'Licensed Feed' | 'Compliant Scraping'
}

export type NewsBrief = {
  id: string
  sourceId: string
  headline: string
  summary: string
  category: Category
  importance: 'High' | 'Medium'
  publishedAt: string
}

export type Question = {
  id: string
  articleId: string
  category: Category
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type UserAnswer = {
  questionId: string
  selectedIndex: number
  isCorrect: boolean
  category: Category
  attemptedAt: string
}

export type CategoryStats = {
  category: Category
  attempted: number
  correct: number
  incorrect: number
  accuracy: number
}

export type ScoreSummary = {
  totalAttempted: number
  totalCorrect: number
  totalIncorrect: number
  totalScore: number
  accuracy: number
  strongestCategory: string
  weakestCategory: string
  categoryStats: CategoryStats[]
}
