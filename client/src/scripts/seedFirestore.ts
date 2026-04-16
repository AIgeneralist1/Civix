/**
 * Firebase Firestore Seed Script
 * ──────────────────────────────
 * Run this ONCE after setting up your Firebase project to populate
 * the Firestore database with initial questions, briefs, and sources.
 *
 * Usage:
 *   npx tsx src/scripts/seedFirestore.ts
 *
 * Prerequisites:
 *   1. Fill in .env.local with your Firebase credentials
 *   2. Enable Firestore in Firebase Console (Native mode)
 *   3. npm install tsx (or use ts-node)
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import * as dotenv from 'dotenv'
import { sources, briefs, questions } from '../data'

dotenv.config({ path: '.env.local' })

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
    console.log('🌱 Seeding Firestore...\n')

    // Sources
    for (const source of sources) {
        await setDoc(doc(db, 'sources', source.id), source)
        console.log(`  ✓ source: ${source.name}`)
    }

    // Briefs
    for (const brief of briefs) {
        await setDoc(doc(db, 'briefs', brief.id), brief)
        console.log(`  ✓ brief: ${brief.headline.slice(0, 50)}...`)
    }

    // Questions
    for (const question of questions) {
        await setDoc(doc(db, 'questions', question.id), question)
        console.log(`  ✓ question: ${question.id} [${question.category}]`)
    }

    console.log('\n✅ Seed complete!')
    process.exit(0)
}

seed().catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
})
