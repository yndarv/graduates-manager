import { authenticateUser } from '$lib/server/service/user';
import { error, redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	try {
		const user = await authenticateUser(token);
		event.locals.user = user;
	} catch (error) {
		console.error(error);
		event.locals.user = undefined;
		event.cookies.delete('token', { path: '/' });
	}

	const apiRouteRegex = /^\/api\//;
	if (apiRouteRegex.test(event.url.pathname) && !event.locals.user) {
		console.log(`unauthorized API access attempt for ${event.url.pathname}`);
		throw error(403, 'Forbidden');
	}

	const protectedRoutes = ['/graduates', '/dist', '/redist', '/unemployed'];
	const isProtected = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isProtected && !event.locals.user) {
		console.log(`unauthorized access attempt for ${event.url.pathname}`);
		throw redirect(302, '/login');
	}

	return await resolve(event);
};
