# Codex Arcana Backend

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Replace `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `config/passport.js` with real values.

3. Start MongoDB on your system (default: mongodb://localhost:27017/codex_arcana)

4. Run the server:

```bash
node server.js
```

## API Routes

- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/google`
- GET `/auth/google/callback`

## Requirements

- Node.js
- MongoDB
