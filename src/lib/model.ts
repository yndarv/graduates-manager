import { graduate } from '$lib/server/db/schema';

export type Graduate = typeof graduate.$inferInsert;
