import type { Source } from '../types'
import PageShell from './PageShell'
import './PageShell.css'
import './SourcesPage.css'

interface SourcesPageProps {
    sources: Source[]
}

const modeColor: Record<string, string> = {
    'API': 'green',
    'RSS': 'accent',
    'Licensed Feed': 'purple',
    'Compliant Scraping': 'yellow',
}

export default function SourcesPage({ sources }: SourcesPageProps) {
    if (sources.length === 0) {
        return (
            <PageShell title="Trusted Sources" subtitle="Daily newspaper ingestion plan." badge="Sources">
                <div className="analytics-empty">
                    <span className="empty-icon">📡</span>
                    <p>No sources available yet. Run the seed script to populate data.</p>
                </div>
            </PageShell>
        )
    }

    return (
        <PageShell
            title="Trusted Sources"
            subtitle="Daily newspaper ingestion plan — APIs, RSS feeds, and licensed content."
            badge="Sources"
        >
            <div className="sources-grid">
                {sources.map(source => (
                    <article key={source.id} className="source-card">
                        <div className="source-top">
                            <div className="source-avatar">{source.name.charAt(0)}</div>
                            <div>
                                <h3 className="source-name">{source.name}</h3>
                                <span className={`chip ${modeColor[source.ingestionMode] ?? ''}`}>
                                    {source.ingestionMode}
                                </span>
                            </div>
                        </div>
                        <p className="source-trust">{source.trustNote}</p>
                    </article>
                ))}
            </div>
        </PageShell>
    )
}
