import type { Graduate } from '$lib/model';

export async function fetchGraduates(): Promise<Graduate[]> {
	return await fetch('/api/graduates')
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function createGraduate(graduate: Graduate) {
	return await fetch('/api/graduates', { method: 'POST', body: JSON.stringify(graduate) })
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export async function updateGraduate(graduate: Graduate) {
	return await fetch('api/graduates', {
		method: 'PATCH',
		body: JSON.stringify({ id: graduate.id, graduate: graduate })
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export async function deleteGraduate(id: number) {
	return await fetch('api/graduates', { method: 'DELETE', body: JSON.stringify({ id }) })
		.then((response) => response.json())
		.catch((error) => console.error(error));
}
