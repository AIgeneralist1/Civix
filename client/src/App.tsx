import { useEffect, useMemo, useState, useCallback } from 'react'
import './App.css'

import { onAuthChange, logOut, type AuthUser } from './services/authService'
import {
  fetchQuestions,
  fetchBriefs,
  fetchSources,
  fetchAttempts,
  saveAttempt,
  deleteAttempts,
  getOrCreateUserProfile,
} from './services/dbService'
import { buildScoreSummary } from './analytics'
import type { Question, NewsBrief, Source, UserAnswer } from './types'

import AuthPage from './components/AuthPage'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import QuizPage from './components/QuizPage'
import BriefsPage from './components/BriefsPage'
import SourcesPage from './components/SourcesPage'
import AnalyticsPage from './components/AnalyticsPage'
import LoadingScreen from './components/LoadingScreen'

import './components/Dashboard.css'

export type Page = 'dashboard' | 'quiz' | 'briefs' | 'sources' | 'analytics'

export default function App() {
  // ── Auth ────────────────────────────────────────────────
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined) // undefined = loading
  const [authReady, setAuthReady] = useState(false)

  // ── Remote data ─────────────────────────────────────────
  const [questions, setQuestions] = useState<Question[]>([])
  const [briefs, setBriefs] = useState<NewsBrief[]>([])
  const [sources, setSources] = useState<Source[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [dataError, setDataError] = useState('')

  // ── Quiz state ──────────────────────────────────────────
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  // ── Router ───────────────────────────────────────────────
  const [page, setPage] = useState<Page>('dashboard')

  // ── Subscribe to Firebase Auth state ────────────────────
  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      setAuthReady(true)

      if (firebaseUser) {
        // Create profile if new user
        await getOrCreateUserProfile(
          firebaseUser.uid,
          firebaseUser.displayName ?? 'Aspirant',
          firebaseUser.email ?? '',
        )
        // Load all data in parallel
        loadData(firebaseUser.uid)
      } else {
        // Reset everything on logout
        setQuestions([])
        setBriefs([])
        setSources([])
        setAnswers([])
        setSelectedAnswers({})
        setSubmitted({})
      }
    })
    return () => unsub()
  }, [])

  const loadData = useCallback(async (uid: string) => {
    setDataLoading(true)
    setDataError('')
    try {
      const [qs, bs, srcs, attempts] = await Promise.all([
        fetchQuestions(),
        fetchBriefs(),
        fetchSources(),
        fetchAttempts(uid),
      ])
      setQuestions(qs)
      setBriefs(bs)
      setSources(srcs)
      setAnswers(attempts.filter(a => !('deleted' in a && (a as unknown as Record<string, unknown>).deleted)))
    } catch (err) {
      console.error(err)
      setDataError('Failed to load data. Check your Firebase config or connection.')
    } finally {
      setDataLoading(false)
    }
  }, [])

  // ── Derived ──────────────────────────────────────────────
  const summary = useMemo(() => buildScoreSummary(answers), [answers])

  const todayAttempted = useMemo(
    () => answers.filter(a => questions.some(q => q.id === a.questionId)).length,
    [answers, questions],
  )

  const todayCorrect = useMemo(
    () => answers.filter(a => questions.some(q => q.id === a.questionId) && a.isCorrect).length,
    [answers, questions],
  )

  // ── Quiz handlers ──────────────────────────────────────
  function handleSelect(questionId: string, optionIndex: number) {
    setSelectedAnswers(cur => ({ ...cur, [questionId]: optionIndex }))
  }

  async function handleSubmit(question: Question) {
    if (!user) return
    const selectedIndex = selectedAnswers[question.id]
    if (selectedIndex === undefined) return

    const answer: UserAnswer = {
      questionId: question.id,
      selectedIndex,
      isCorrect: selectedIndex === question.correctIndex,
      category: question.category,
      attemptedAt: new Date().toISOString(),
    }

    // Optimistic update
    setAnswers(cur => [...cur.filter(a => a.questionId !== question.id), answer])
    setSubmitted(cur => ({ ...cur, [question.id]: true }))

    // Persist to Firestore
    await saveAttempt(user.uid, answer)
  }

  async function handleReset() {
    if (!user) return
    setAnswers([])
    setSelectedAnswers({})
    setSubmitted({})
    await deleteAttempts(user.uid)
  }

  async function handleLogout() {
    await logOut()
    setPage('dashboard')
  }

  // ── Render ───────────────────────────────────────────────

  // 1. Firebase initialising
  if (!authReady) return <LoadingScreen message="Initialising…" />

  // 2. Not logged in → show auth page
  if (!user) return <AuthPage onLogin={() => { }} />

  // 3. Logged in but data still loading
  if (dataLoading) return <LoadingScreen message="Loading your data…" />

  // 4. Data error (usually misconfigured Firebase)
  if (dataError) return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', color: '#f87171', fontFamily: 'Inter,sans-serif', padding: '40px', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: '#f0f6ff', marginBottom: '12px' }}>Firebase not configured</h2>
        <p style={{ maxWidth: '50ch', margin: '0 auto', color: '#94a3b8' }}>{dataError}</p>
        <p style={{ marginTop: '20px', color: '#64748b', fontSize: '0.85rem' }}>
          Fill in your Firebase credentials in <code style={{ color: '#93c5fd' }}>.env.local</code>, then refresh.
        </p>
      </div>
    </div>
  )

  function renderPage() {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            summary={summary}
            todayAttempted={todayAttempted}
            todayCorrect={todayCorrect}
            onNavigate={setPage}
            userName={user!.displayName ?? user!.email ?? 'Aspirant'}
            questionCount={questions.length}
          />
        )
      case 'quiz':
        return (
          <QuizPage
            questions={questions}
            answers={answers}
            selectedAnswers={selectedAnswers}
            submitted={submitted}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        )
      case 'briefs': return <BriefsPage briefs={briefs} sources={sources} />
      case 'sources': return <SourcesPage sources={sources} />
      case 'analytics': return <AnalyticsPage summary={summary} />
      default: return null
    }
  }

  return (
    <>
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
        userName={user.displayName ?? user.email ?? 'Aspirant'}
      />
      <main id="main-content">
        {renderPage()}
      </main>
    </>
  )
}
