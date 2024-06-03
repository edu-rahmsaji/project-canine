# API

This is an API for testing `mongoose`.

## Getting Started

1. Install the dependencies

```bash
npm install
```

2. Set up mongodb database. Then, use the json collection in `src/database/data` to recreate the collections.

3. Set the API port and the DB URI in `.env`.

```bash
APP_PORT=4000
DB_URI=mongodb://localhost:27017/cours_canin
```

4. Run the server

```bash
npm run dev
```
