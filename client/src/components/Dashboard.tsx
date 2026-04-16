import type { ScoreSummary } from '../types'
import type { Page } from '../App'
import PageShell from './PageShell'
import './PageShell.css'

interface DashboardProps {
    summary: ScoreSummary
    todayAttempted: number
    todayCorrect: number
    onNavigate: (page: Page) => void
    userName: string
    questionCount: number
}

export default function Dashboard({ summary, todayAttempted, todayCorrect, onNavigate, userName, questionCount }: DashboardProps) {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

    const quickLinks: { page: Page; label: string; desc: string; icon: string; color: string }[] = [
        { page: 'quiz', label: 'Daily Quiz', desc: `${questionCount} questions today`, icon: '✦', color: '#60a5fa' },
        { page: 'briefs', label: 'News Briefs', desc: 'Curated UPSC-relevant articles', icon: '◈', color: '#34d399' },
        { page: 'analytics', label: 'Analytics', desc: 'Your section-wise performance', icon: '◆', color: '#f59e0b' },
        { page: 'sources', label: 'Sources', desc: 'Daily newspaper ingestion plan', icon: '◎', color: '#c4b5fd' },
    ]

    return (
        <PageShell
            title={`${greeting}, ${userName} 👋`}
            subtitle="Here's your UPSC preparation snapshot for today."
            badge="Dashboard"
        >
            {/* Today's stats */}
            <section aria-label="Today's Quiz Status">
                <div className="card-label">Today's Quiz Status</div>
                <div className="metrics-row">
                    <div className="metric">
                        <div className="metric-label">Questions</div>
                        <div className="metric-value accent">{questionCount}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Attempted</div>
                        <div className="metric-value warning">{todayAttempted}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Correct</div>
                        <div className="metric-value success">{todayCorrect}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Score</div>
                        <div className="metric-value accent">{todayCorrect * 2}</div>
                    </div>
                </div>
            </section>

            {/* Overall stats */}
            <section aria-label="Overall Performance">
                <div className="card-label">Overall Performance</div>
                <div className="metrics-row">
                    <div className="metric">
                        <div className="metric-label">Total Attempted</div>
                        <div className="metric-value">{summary.totalAttempted}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Total Correct</div>
                        <div className="metric-value success">{summary.totalCorrect}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Total Incorrect</div>
                        <div className="metric-value danger">{summary.totalIncorrect}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Accuracy</div>
                        <div className="metric-value accent">{summary.accuracy}%</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Strongest Section</div>
                        <div className="metric-value label">{summary.strongestCategory || '—'}</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">Weakest Section</div>
                        <div className="metric-value label">{summary.weakestCategory || '—'}</div>
                    </div>
                </div>
            </section>

            {/* Quick nav */}
            <section aria-label="Quick Navigation">
                <div className="card-label">Quick Access</div>
                <div className="quick-grid">
                    {quickLinks.map(link => (
                        <button
                            key={link.page}
                            className="quick-card"
                            onClick={() => onNavigate(link.page)}
                            id={`dash-nav-${link.page}`}
                        >
                            <span className="quick-icon" style={{ color: link.color, background: `${link.color}18` }}>
                                {link.icon}
                            </span>
                            <div>
                                <div className="quick-label">{link.label}</div>
                                <div className="quick-desc">{link.desc}</div>
                            </div>
                            <span className="quick-arrow">→</span>
                        </button>
                    ))}
                </div>
            </section>
        </PageShell>
    )
}
