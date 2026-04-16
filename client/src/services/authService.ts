/**
 * Firebase Authentication service
 * Wraps Firebase Auth SDK with typed helpers used across the app.
 */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    type User,
} from 'firebase/auth'
import { auth } from '../firebase'

export type AuthUser = {
    uid: string
    email: string | null
    displayName: string | null
}

/** Convert Firebase User → our thin AuthUser shape */
function toAuthUser(user: User): AuthUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    }
}

/** Sign up with email + password, then set displayName */
export async function signUp(name: string, email: string, password: string): Promise<AuthUser> {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    return toAuthUser({ ...cred.user, displayName: name } as User)
}

/** Sign in with email + password */
export async function signIn(email: string, password: string): Promise<AuthUser> {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return toAuthUser(cred.user)
}

/** Sign out */
export async function logOut(): Promise<void> {
    await signOut(auth)
}

/** Subscribe to auth state changes — returns unsubscribe fn */
export function onAuthChange(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (user) => {
        callback(user ? toAuthUser(user) : null)
    })
}
