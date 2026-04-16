import PageShell from './PageShell'
import './PageShell.css'
import './InfoPage.css'

const securityRules = [
    { icon: '🛡', title: 'Input Sanitisation', desc: 'Treat scraped article text as untrusted input and harden against prompt injection.' },
    { icon: '🔒', title: 'Allowlist & SSRF Protection', desc: 'Restrict ingestion to allowlisted domains, enforce timeouts, and block SSRF paths.' },
    { icon: '✅', title: 'Validation & RBAC', desc: 'Validate all generated questions before publish and keep admin moderation protected by RBAC.' },
    { icon: '🔐', title: 'Transport & Storage', desc: 'Use parameterized queries, secure password hashing, TLS, strict CORS, and audit logging.' },
]

export default function SecurityPage() {
    return (
        <PageShell
            title="Security Rules"
            subtitle="Controls the backend must enforce before launch."
            badge="Security"
        >
            <div className="security-grid">
                {securityRules.map(rule => (
                    <div key={rule.title} className="security-card">
                        <div className="security-icon">{rule.icon}</div>
                        <div>
                            <h3 className="security-title">{rule.title}</h3>
                            <p className="security-desc">{rule.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </PageShell>
    )
}
