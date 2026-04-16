import PageShell from './PageShell'
import './PageShell.css'
import './InfoPage.css'

const architectureSteps = [
    { icon: '📡', title: 'Ingest', desc: 'Ingest news via APIs or RSS first, with compliant scraping only as a fallback.' },
    { icon: '🔍', title: 'Filter & Cluster', desc: 'Run UPSC relevance filtering, article clustering, and category tagging.' },
    { icon: '🤖', title: 'Generate MCQs', desc: 'Generate MCQs with an LLM behind validation and reviewer approval gates.' },
    { icon: '📊', title: 'Publish & Track', desc: 'Publish a daily quiz, store attempts, and update cumulative user analytics.' },
]

export default function ArchitecturePage() {
    return (
        <PageShell
            title="Architecture"
            subtitle="Production flow for the full Civix ingestion-to-quiz pipeline."
            badge="Architecture"
        >
            <div className="steps-grid">
                {architectureSteps.map((step, i) => (
                    <div key={step.title} className="step-card">
                        <div className="step-number">Step {i + 1}</div>
                        <div className="step-icon">{step.icon}</div>
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-desc">{step.desc}</p>
                    </div>
                ))}
            </div>

            <div className="pipeline-flow" aria-label="Pipeline overview">
                {architectureSteps.map((step, i) => (
                    <div key={step.title} className="pipeline-node">
                        <span className="pipeline-icon">{step.icon}</span>
                        <span className="pipeline-label">{step.title}</span>
                        {i < architectureSteps.length - 1 && (
                            <span className="pipeline-arrow" aria-hidden="true">→</span>
                        )}
                    </div>
                ))}
            </div>
        </PageShell>
    )
}
