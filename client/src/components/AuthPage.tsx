import { useState } from 'react'
import { signIn, signUp } from '../services/authService'
import './Auth.css'

interface AuthPageProps {
    onLogin: () => void  // parent re-renders via onAuthChange
}

export default function AuthPage({ onLogin }: AuthPageProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function validate(): string {
        if (mode === 'signup' && !name.trim()) return 'Please enter your name.'
        if (!email.includes('@')) return 'Enter a valid email address.'
        if (password.length < 6) return 'Password must be at least 6 characters.'
        if (mode === 'signup' && password !== confirm) return 'Passwords do not match.'
        return ''
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const err = validate()
        if (err) { setError(err); return }

        setLoading(true)
        setError('')

        try {
            if (mode === 'signup') {
                await signUp(name.trim(), email, password)
            } else {
                await signIn(email, password)
            }
            onLogin()
        } catch (firebaseErr: unknown) {
            const msg = (firebaseErr as { code?: string; message?: string }).code
            setError(friendlyError(msg ?? ''))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            {/* Left brand panel */}
            <div className="auth-brand">
                <div className="brand-content">
                    <div className="brand-logo"><span>C</span></div>
                    <h1 className="brand-title">Civix</h1>
                    <p className="brand-tagline">Turn today's news into tomorrow's rank.</p>
                    <ul className="brand-features">
                        <li><span className="feat-icon">✦</span> AI-generated UPSC MCQs daily</li>
                        <li><span className="feat-icon">◆</span> Category-wise performance analytics</li>
                        <li><span className="feat-icon">◈</span> Curated news briefs from top sources</li>
                        <li><span className="feat-icon">⬢</span> Intelligent scoring &amp; explanations</li>
                    </ul>
                </div>
                <div className="brand-orb orb1" aria-hidden="true" />
                <div className="brand-orb orb2" aria-hidden="true" />
                <div className="brand-orb orb3" aria-hidden="true" />
            </div>

            {/* Right form panel */}
            <div className="auth-form-panel">
                <div className="auth-card">
                    {/* Tabs */}
                    <div className="auth-tabs" role="tablist">
                        <button
                            id="tab-login"
                            role="tab"
                            aria-selected={mode === 'login'}
                            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                            onClick={() => { setMode('login'); setError('') }}
                        >
                            Sign In
                        </button>
                        <button
                            id="tab-signup"
                            role="tab"
                            aria-selected={mode === 'signup'}
                            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                            onClick={() => { setMode('signup'); setError('') }}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="auth-header">
                        <h2 className="auth-title">
                            {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
                        </h2>
                        <p className="auth-subtext">
                            {mode === 'login' ? 'Pick up where you left off.' : 'Start your UPSC preparation journey.'}
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {mode === 'signup' && (
                            <div className="field-group">
                                <label htmlFor="auth-name">Full Name</label>
                                <input
                                    id="auth-name"
                                    type="text"
                                    placeholder="Arjun Sharma"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoComplete="name"
                                />
                            </div>
                        )}
                        <div className="field-group">
                            <label htmlFor="auth-email">Email Address</label>
                            <input
                                id="auth-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                        <div className="field-group">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                id="auth-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                        </div>
                        {mode === 'signup' && (
                            <div className="field-group">
                                <label htmlFor="auth-confirm">Confirm Password</label>
                                <input
                                    id="auth-confirm"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        )}

                        {error && <p className="auth-error" role="alert">⚠ {error}</p>}

                        <button
                            id="auth-submit-btn"
                            type="submit"
                            className={`auth-submit ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            className="auth-link"
                            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
                        >
                            {mode === 'login' ? 'Sign up free' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

// Map Firebase error codes → human-readable messages
function friendlyError(code: string): string {
    const map: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Check your connection.',
    }
    return map[code] ?? 'Something went wrong. Please try again.'
}
