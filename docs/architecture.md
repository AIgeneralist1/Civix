# Civix Architecture

## Objective
Build a UPSC daily practice application that ingests important current-affairs coverage from five reputed newspapers, converts selected items into UPSC-style MCQs, and tracks cumulative learner performance.

## System Modules

### 1. Ingestion Service
- Preferred source order: official APIs, RSS feeds, licensed feeds, compliant scraping.
- Fetch article metadata and content on a schedule.
- Store source, URL, publication date, extraction status, and raw text checksum.

### 2. Relevance and Classification
- Score article relevance against a UPSC taxonomy.
- Reject non-syllabus noise.
- Assign categories such as Polity, Economy, Environment, Geography, and Science and Technology.

### 3. Deduplication and Clustering
- Cluster similar stories across newspapers by semantic similarity and canonical topic keys.
- Generate one topic packet from multiple articles before question generation.

### 4. MCQ Generation
- Use an LLM to produce UPSC-style MCQs with explanation, source traceability, and difficulty labels.
- Enforce one correct answer and reject low-confidence outputs.

### 5. Moderation and Publish
- Route questions through reviewer approval for the MVP.
- Publish reviewed questions to the daily quiz set.

### 6. Quiz and Analytics
- Store attempts, correct answers, accuracy, total score, and section-wise analytics.
- Identify strongest and weakest section only after a minimum attempt threshold.

## Suggested Stack
- Frontend: React or Next.js
- Backend: FastAPI
- Database: PostgreSQL
- Queue and cache: Redis
- Scheduler: Celery beat or cron
- Object and audit storage: cloud blob storage plus log aggregation

## High-Level Data Flow
1. Scheduler pulls articles from five allowlisted sources.
2. Content extraction normalizes article text and metadata.
3. Relevance classifier filters and tags UPSC-appropriate items.
4. Deduplication groups overlapping stories into topic clusters.
5. LLM generates MCQs from curated cluster input.
6. Validation rules and reviewer workflow approve or reject items.
7. Approved questions are attached to the daily quiz.
8. User attempts update cumulative and section-wise analytics.

## Core Tables
- `sources`
- `articles`
- `article_clusters`
- `categories`
- `questions`
- `question_reviews`
- `quizzes`
- `quiz_questions`
- `users`
- `attempts`
- `user_stats`
- `category_stats`

## MVP Scope
- One learner profile
- Five news sources
- Ten to twenty questions per day
- Reviewer approval before publish
- Dashboard with total attempted, correct, incorrect, score, section accuracy, strongest section, weakest section
