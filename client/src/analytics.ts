import { minimumStrengthThreshold } from './data'
import type { Category, CategoryStats, ScoreSummary, UserAnswer } from './types'

const categories: Category[] = [
  'Polity',
  'Economy',
  'International Relations',
  'Environment',
  'Science and Technology',
  'History and Culture',
  'Geography',
  'Government Schemes',
  'Awards / Reports / Indices',
]

export function buildScoreSummary(answers: UserAnswer[]): ScoreSummary {
  const categoryStats: CategoryStats[] = categories.map((category) => {
    const categoryAnswers = answers.filter((answer) => answer.category === category)
    const attempted = categoryAnswers.length
    const correct = categoryAnswers.filter((answer) => answer.isCorrect).length
    const incorrect = attempted - correct
    const accuracy = attempted === 0 ? 0 : Math.round((correct / attempted) * 100)

    return {
      category,
      attempted,
      correct,
      incorrect,
      accuracy,
    }
  })

  const totalAttempted = answers.length
  const totalCorrect = answers.filter((answer) => answer.isCorrect).length
  const totalIncorrect = totalAttempted - totalCorrect
  const totalScore = totalCorrect * 2
  const accuracy =
    totalAttempted === 0 ? 0 : Math.round((totalCorrect / totalAttempted) * 100)

  const eligibleCategories = categoryStats.filter(
    (category) => category.attempted >= minimumStrengthThreshold,
  )

  const strongestCategory =
    eligibleCategories.length === 0
      ? 'Not enough data yet'
      : eligibleCategories.reduce((best, current) =>
          current.accuracy > best.accuracy ? current : best,
        ).category

  const weakestCategory =
    eligibleCategories.length === 0
      ? 'Not enough data yet'
      : eligibleCategories.reduce((worst, current) =>
          current.accuracy < worst.accuracy ? current : worst,
        ).category

  return {
    totalAttempted,
    totalCorrect,
    totalIncorrect,
    totalScore,
    accuracy,
    strongestCategory,
    weakestCategory,
    categoryStats,
  }
}
