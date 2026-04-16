import './LoadingScreen.css'

export default function LoadingScreen({ message = 'Loading…' }: { message?: string }) {
    return (
        <div className="loading-screen" role="status" aria-live="polite">
            <div className="loading-logo">C</div>
            <div className="loading-spinner" aria-hidden="true">
                <div /><div /><div /><div />
            </div>
            <p className="loading-message">{message}</p>
        </div>
    )
}
