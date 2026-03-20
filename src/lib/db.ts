import { getRequestContext } from '@cloudflare/next-on-pages';
import { initializeDb } from '@/lib/models';

export interface Env {
  DB: D1Database;
}

let dbInitialized = false;

export function getDb(): D1Database {
  const { env } = getRequestContext();
  return (env as Env).DB;
}

export async function getInitializedDb(): Promise<D1Database> {
  const db = getDb();
  if (!dbInitialized) {
    await initializeDb(db);
    dbInitialized = true;
  }
  return db;
}
