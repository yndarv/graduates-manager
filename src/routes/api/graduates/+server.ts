import { createGraduate, getAllGraduates, updateGraduate } from '$lib/server/service/graduate';
import { json, error as err } from '@sveltejs/kit';

export async function GET() {
	try {
		const graduates = await getAllGraduates();
		return json(graduates);
	} catch (error) {
		console.error(error);
		let message = 'Error occured while trying to fetch graduates GET /api/graduates: ' + error;
		if (error instanceof Error) message = error.message;
		err(500, message);
	}
}

export async function POST(event) {
	try {
		const graduate = await event.request.json();
		const { insertedId } = await createGraduate(graduate);
		return json(insertedId);
	} catch (error) {
		console.error(error);
		const message = 'Error occured while trying to create graduate';
		err(500, message);
	}
}

export async function PUT(event) {
	try {
		const { id, graduate } = await event.request.json();
		const { updatedId } = await updateGraduate(id, graduate);
		return json(updatedId);
	} catch (error) {
		console.error(error);
		const message = 'Error occured while trying to update graduate PUT /api/graduate';
		err(500, message);
	}
}

export async function DELETE(event) {
	try {
		const { id } = await event.request.json();
		const { deletedId } = await deleteGraduate(id);
		return json(deletedId);
	} catch (error) {
		console.error(error);
		const message = 'Error occured while trying to delete graduate DELETE /api/graduate';
	}
}
