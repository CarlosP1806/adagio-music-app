import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

// Only create new client instance if none exists to avoid duplicates
if (!global.__db) {
    global.__db = new PrismaClient();
}

db = global.__db;
export { db };