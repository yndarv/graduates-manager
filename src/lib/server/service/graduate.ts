import { db } from '$lib/server/db/index';
import { graduate as graduateTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

type NewGraduate = typeof graduateTable.$inferInsert;

export async function createGraduate(graduate: NewGraduate) {
	const [insertedId] = await db
		.insert(graduateTable)
		.values(graduate)
		.returning({ id: graduateTable.id });

	return { insertedId };
}

export async function removeGraduate(id: number) {
	const [removedId] = await db
		.delete(graduateTable)
		.where(eq(graduateTable.id, id))
		.limit(1)
		.returning({ removedId: graduateTable.id });

	return { removedId };
}

export async function updateGraduate(id: number, graduate: NewGraduate) {
	const [updatedId] = await db
		.update(graduateTable)
		.set(graduate)
		.where(eq(graduateTable.id, id))
		.returning({ updatedId: graduateTable.id });

	return { updatedId };
}

export async function getAllGraduates() {
	return await db.select().from(graduateTable);
}
