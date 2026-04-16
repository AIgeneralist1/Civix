/**
 * Firestore database service
 * All reads/writes to Firestore go through here.
 *
 * Collections:
 *   questions/{id}         – MCQ question documents
 *   briefs/{id}            – News brief documents
 *   sources/{id}           – Newspaper source documents
 *   attempts/{uid_qid}     – One doc per user per question
 *   users/{uid}            – User profile + aggregate stats
 */
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Question, NewsBrief, Source, UserAnswer } from '../types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function snap<T>(d: DocumentData): T {
    return { id: d.id, ...d.data() } as T
}

// ── Questions ─────────────────────────────────────────────────────────────────

export async function fetchQuestions(): Promise<Question[]> {
    const snapshot = await getDocs(collection(db, 'questions'))
    return snapshot.docs.map(d => snap<Question>(d))
}

// ── Briefs ────────────────────────────────────────────────────────────────────

export async function fetchBriefs(): Promise<NewsBrief[]> {
    const q = query(collection(db, 'briefs'), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => snap<NewsBrief>(d))
}

// ── Sources ───────────────────────────────────────────────────────────────────

export async function fetchSources(): Promise<Source[]> {
    const snapshot = await getDocs(collection(db, 'sources'))
    return snapshot.docs.map(d => snap<Source>(d))
}

// ── User Attempts ─────────────────────────────────────────────────────────────

/** Load all attempts for a given user */
export async function fetchAttempts(uid: string): Promise<UserAnswer[]> {
    const q = query(
        collection(db, 'attempts'),
        where('uid', '==', uid),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => d.data() as UserAnswer)
}

/** Save or overwrite a single attempt */
export async function saveAttempt(uid: string, answer: UserAnswer): Promise<void> {
    const docId = `${uid}_${answer.questionId}`
    await setDoc(doc(db, 'attempts', docId), {
        uid,
        ...answer,
        savedAt: serverTimestamp(),
    })
}

/** Delete all attempts for a user (reset progress) */
export async function deleteAttempts(uid: string): Promise<void> {
    const q = query(collection(db, 'attempts'), where('uid', '==', uid))
    const snapshot = await getDocs(q)
    await Promise.all(
        snapshot.docs.map(d =>
            setDoc(doc(db, 'attempts', d.id), { deleted: true, uid }, { merge: true }),
        ),
    )
}

// ── User profile ──────────────────────────────────────────────────────────────

export async function getOrCreateUserProfile(uid: string, displayName: string, email: string) {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
        await setDoc(ref, {
            uid,
            displayName,
            email,
            createdAt: serverTimestamp(),
        })
    }
    return snap.data() ?? { uid, displayName, email }
}
