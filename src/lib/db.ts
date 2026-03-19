import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Env {
  DB: D1Database;
}

export function getDb(): D1Database {
  const { env } = getRequestContext();
  return (env as Env).DB;
}
