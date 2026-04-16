import './PageShell.css'

interface PageShellProps {
    title: string
    subtitle?: string
    badge?: string
    children: React.ReactNode
}

export default function PageShell({ title, subtitle, badge, children }: PageShellProps) {
    return (
        <div className="page-shell">
            <div className="page-header">
                {badge && <span className="page-badge">{badge}</span>}
                <h1 className="page-title">{title}</h1>
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            <div className="page-body">
                {children}
            </div>
        </div>
    )
}
