import type { Cookies } from '@sveltejs/kit';

export function setAuthToken(cookies: Cookies, token: string) {
	cookies.set('token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24, // 1d
		path: '/'
	});
}
