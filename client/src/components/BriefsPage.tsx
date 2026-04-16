import type { NewsBrief, Source } from '../types'
import PageShell from './PageShell'
import './PageShell.css'
import './BriefsPage.css'

interface BriefsPageProps {
    briefs: NewsBrief[]
    sources: Source[]
}

const importanceColor: Record<string, string> = { High: 'red', Medium: 'yellow' }

export default function BriefsPage({ briefs, sources }: BriefsPageProps) {
    if (briefs.length === 0) {
        return (
            <PageShell title="Daily Briefs" subtitle="UPSC-relevant news summaries." badge="Briefs">
                <div className="analytics-empty">
                    <span className="empty-icon">📰</span>
                    <p>No briefs available yet. Run the seed script to populate data.</p>
                </div>
            </PageShell>
        )
    }

    return (
        <PageShell
            title="Daily Briefs"
            subtitle="UPSC-relevant news selected and summarised for question generation."
            badge="Briefs"
        >
            <div className="briefs-grid">
                {briefs.map(brief => {
                    const source = sources.find(s => s.id === brief.sourceId)
                    return (
                        <article key={brief.id} className="brief-card">
                            <div className="brief-top">
                                <div className="brief-chips">
                                    <span className="chip">{brief.category}</span>
                                    <span className={`chip ${importanceColor[brief.importance] ?? ''}`}>
                                        {brief.importance} Priority
                                    </span>
                                </div>
                                {source && <span className="brief-source">{source.name}</span>}
                            </div>
                            <h3 className="brief-headline">{brief.headline}</h3>
                            <p className="brief-summary">{brief.summary}</p>
                            <p className="brief-date">
                                {new Date(brief.publishedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'long', year: 'numeric',
                                })}
                            </p>
                        </article>
                    )
                })}
            </div>
        </PageShell>
    )
}
