import type { Question, UserAnswer } from '../types'
import PageShell from './PageShell'
import './PageShell.css'
import './QuizPage.css'

interface QuizPageProps {
    questions: Question[]
    answers: UserAnswer[]
    selectedAnswers: Record<string, number>
    submitted: Record<string, boolean>
    onSelect: (questionId: string, optionIndex: number) => void
    onSubmit: (question: Question) => void
    onReset: () => void
}

const difficultyColor: Record<string, string> = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red',
}

export default function QuizPage({
    questions, answers, selectedAnswers, submitted, onSelect, onSubmit, onReset,
}: QuizPageProps) {
    const recentAttemptMap = answers.reduce<Record<string, UserAnswer>>((acc, a) => {
        acc[a.questionId] = a
        return acc
    }, {})

    const attempted = questions.filter(q => recentAttemptMap[q.id]).length
    const correct = questions.filter(q => recentAttemptMap[q.id]?.isCorrect).length

    return (
        <PageShell
            title="Daily Quiz"
            subtitle="UPSC-style MCQs generated from today's most relevant news."
            badge="Quiz"
        >
            {/* Progress bar + reset */}
            <div className="quiz-header">
                <div className="quiz-progress-wrap">
                    <div className="quiz-progress-labels">
                        <span>{attempted}/{questions.length} attempted</span>
                        <span>{correct} correct</span>
                    </div>
                    <div className="quiz-progress-bar">
                        <div
                            className="quiz-progress-fill"
                            style={{ width: `${questions.length ? (attempted / questions.length) * 100 : 0}%` }}
                        />
                    </div>
                </div>
                <button className="btn-ghost" onClick={onReset} id="quiz-reset-btn">
                    ↺ Reset Progress
                </button>
            </div>

            {/* Questions */}
            <div className="question-list">
                {questions.map((question, index) => {
                    const savedAnswer = recentAttemptMap[question.id]
                    const currentSel = selectedAnswers[question.id] ?? savedAnswer?.selectedIndex
                    const wasSubmitted = submitted[question.id] || Boolean(savedAnswer)

                    return (
                        <article key={question.id} className="question-card">
                            {/* Meta */}
                            <div className="q-meta">
                                <div className="q-meta-left">
                                    <span className="q-number">Q{index + 1}</span>
                                    <span className="chip">{question.category}</span>
                                </div>
                                <span className={`chip ${difficultyColor[question.difficulty] ?? ''}`}>
                                    {question.difficulty}
                                </span>
                            </div>

                            <h3 className="q-text">{question.question}</h3>

                            {/* Options */}
                            <div className="options-grid">
                                {question.options.map((option, oi) => {
                                    const isChosen = currentSel === oi
                                    const isCorrect = question.correctIndex === oi
                                    const state = wasSubmitted
                                        ? isCorrect ? 'correct' : isChosen ? 'wrong' : ''
                                        : isChosen ? 'selected' : ''

                                    return (
                                        <label key={option} className={`option-label ${state}`}>
                                            <input
                                                type="radio"
                                                name={question.id}
                                                checked={isChosen}
                                                onChange={() => onSelect(question.id, oi)}
                                                disabled={wasSubmitted}
                                            />
                                            <span className="option-letter">{String.fromCharCode(65 + oi)}</span>
                                            <span>{option}</span>
                                        </label>
                                    )
                                })}
                            </div>

                            {/* Footer */}
                            <div className="q-footer">
                                <button
                                    className="btn-primary"
                                    onClick={() => onSubmit(question)}
                                    disabled={currentSel === undefined || wasSubmitted}
                                    id={`submit-q-${question.id}`}
                                >
                                    {savedAnswer ? '✓ Answered' : 'Submit Answer'}
                                </button>
                                {wasSubmitted && (
                                    <div className="explanation-box">
                                        <span className="exp-label">💡 Explanation</span>
                                        <p>{question.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </article>
                    )
                })}
            </div>
        </PageShell>
    )
}
