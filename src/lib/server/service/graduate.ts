import type { Graduate } from '$lib/model';
import { db } from '$lib/server/db/index';
import { graduate as graduateTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

function validateGraduate(graduate: Graduate) {
	const { isDistributed, isUnemployed } = graduate;
	return [isDistributed, isUnemployed].filter(Boolean).length < 2;
}

export async function createGraduate(graduate: Graduate) {
	if (!validateGraduate(graduate)) {
		throw new Error('isDistributed and isUnemployed statuses are mutually exclusive');
	}

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

export async function updateGraduate(id: number, graduate: Graduate) {
	if (!validateGraduate(graduate)) {
		throw new Error('isDistributed and isUnemployed statuses are mutually exclusive');
	}

	const [updatedId] = await db
		.update(graduateTable)
		.set(graduate)
		.where(eq(graduateTable.id, id))
		.returning({ updatedId: graduateTable.id });

	return { updatedId };
}

export async function getAllGraduates(): Promise<Graduate[]> {
	return await db.select().from(graduateTable);
}

export async function deleteGraduate(id: number) {
	return await db
		.delete(graduateTable)
		.where(eq(graduateTable.id, id))
		.returning({ deletedId: graduateTable.id });
}
