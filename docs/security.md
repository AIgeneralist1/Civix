# Civix Security Rules

## Secure Development Baseline
- Enforce HTTPS in all environments beyond local development.
- Store secrets in environment variables or a secret manager, never in source control.
- Use dependency scanning and static analysis in CI.
- Keep production and admin credentials separate.

## Authentication and Authorization
- Hash passwords with Argon2id or bcrypt.
- Use role-based access control for learner, reviewer, and admin roles.
- Protect publish, ingestion control, and review endpoints behind privileged roles.
- Add brute-force protection and login throttling.

## Input and API Validation
- Validate all request bodies, headers, query parameters, URLs, and generated content with typed schemas.
- Use parameterized queries or ORM safeguards for all database access.
- Escape rendered content and sanitize any HTML derived from external sources.
- Apply CSRF protection for cookie-based sessions and strict token handling for JWTs.

## Ingestion Security
- Treat every external URL and every article body as untrusted.
- Restrict network fetches to allowlisted domains.
- Block localhost, RFC1918, metadata, and loopback targets to prevent SSRF.
- Enforce response size limits, MIME checks, and request timeouts.
- Respect legal and licensing constraints for newspaper content ingestion.

## LLM Security
- Keep system instructions isolated from article content.
- Strip or sandbox prompt-like article text before passing it to the model.
- Never allow source content to override internal generation rules.
- Validate model outputs before persistence or publication.
- Reject questions with missing explanations, multiple plausible answers, or unsupported claims.
- Prevent exposure of hidden prompts, credentials, and moderation policy text.

## Observability and Audit
- Log auth failures, reviewer actions, ingestion failures, and abnormal traffic.
- Avoid logging passwords, tokens, or full personally identifiable data.
- Retain audit trails for question generation, edits, approvals, and publishing events.

## Operational Hardening
- Apply strict CORS.
- Use security headers, including content security policy where feasible.
- Back up the database securely and test restores.
- Run with least-privilege database and infrastructure roles.
