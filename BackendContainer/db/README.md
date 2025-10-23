# MongoDB Initialization

This directory contains the MongoDB initialization script to set up collections, schema validators, and indexes for the Maharashtra AI Agents Platform.

## Files
- `init/init.js` — Creates:
  - `users`, `conversations`, `schemes`, `vector_embeddings`, `audit_logs`
  - Applies `$jsonSchema` validators
  - Adds all required indexes (unique username, content_id, timestamps, etc.)

## Prerequisites
- MongoDB instance accessible
- `mongosh` installed locally
- Backend `.env` configured (see `mumbairfp/BackendContainer/.env.example`):
  - `MONGODB_URI`
  - `MONGODB_DB_NAME`

## How to Run

Replace the placeholders with your actual connection details or export them in your shell.

Option A: Inline connection
```
mongosh "<MONGODB_URI>/<MONGODB_DB_NAME>" --file mumbairfp/BackendContainer/db/init/init.js
```

Example (local MongoDB):
```
mongosh "mongodb://localhost:27017/ai_agents_platform_db" --file mumbairfp/BackendContainer/db/init/init.js
```

Option B: Using env variables (bash)
```
export MONGODB_URI="mongodb://localhost:27017"
export MONGODB_DB_NAME="ai_agents_platform_db"
mongosh "${MONGODB_URI}/${MONGODB_DB_NAME}" --file mumbairfp/BackendContainer/db/init/init.js
```

## Idempotency

- Collections are created if they do not exist.
- Validators are applied to existing collections where possible.
- Index creation is safe to run multiple times (`createIndex` is idempotent based on keys and options).

## Troubleshooting

- Ensure network access and credentials for your MongoDB.
- If `collMod` fails due to permissions, run with an account that has appropriate privileges.
- Verify the database name matches `MONGODB_DB_NAME`.
