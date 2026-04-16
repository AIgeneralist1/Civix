import type { ScoreSummary } from '../types'
import PageShell from './PageShell'
import './PageShell.css'
import './AnalyticsPage.css'

interface AnalyticsPageProps {
    summary: ScoreSummary
}

export default function AnalyticsPage({ summary }: AnalyticsPageProps) {
    return (
        <PageShell
            title="Section Analytics"
            subtitle="Your performance broken down by UPSC category — identify strengths and gaps."
            badge="Analytics"
        >
            {/* Top-level summary */}
            <div className="metrics-row">
                <div className="metric">
                    <div className="metric-label">Total Attempted</div>
                    <div className="metric-value">{summary.totalAttempted}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Correct</div>
                    <div className="metric-value success">{summary.totalCorrect}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Incorrect</div>
                    <div className="metric-value danger">{summary.totalIncorrect}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Accuracy</div>
                    <div className="metric-value accent">{summary.accuracy}%</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Total Score</div>
                    <div className="metric-value warning">{summary.totalScore}</div>
                </div>
            </div>

            {/* Per-category stats */}
            <div>
                <div className="card-label" style={{ marginBottom: '16px' }}>Category Breakdown</div>
                {summary.categoryStats.length === 0 ? (
                    <div className="analytics-empty">
                        <span className="empty-icon">📊</span>
                        <p>No attempts yet. Start the Daily Quiz to see your analytics.</p>
                    </div>
                ) : (
                    <div className="analytics-list">
                        {summary.categoryStats.map(stat => (
                            <div key={stat.category} className="analytics-row">
                                <div className="analytics-info">
                                    <h3 className="analytics-cat">{stat.category}</h3>
                                    <div className="analytics-sub">
                                        {stat.attempted} attempted · {stat.correct} correct · {stat.incorrect} incorrect
                                    </div>
                                </div>
                                <div className="analytics-bar-wrap">
                                    <div className="analytics-bar">
                                        <div
                                            className="analytics-bar-fill"
                                            style={{ width: `${stat.accuracy}%` }}
                                            role="progressbar"
                                            aria-valuenow={stat.accuracy}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <span className="analytics-pct">{stat.accuracy}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageShell>
    )
}
