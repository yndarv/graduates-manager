import { redirect } from '@sveltejs/kit';

export function POST({ cookies }) {
	cookies.delete('token', { path: '/' }); // Adjust based on your session handling
	throw redirect(302, '/login'); // Redirect to login after logout
}
