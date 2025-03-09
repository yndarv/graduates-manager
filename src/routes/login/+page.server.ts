import { fail, redirect } from '@sveltejs/kit';
import { InvalidUserCredentialsError, loginUser } from '$lib/server/service/user';
import { setAuthToken } from '$lib/util.js';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const username = formData.username as string;
		const password = formData.password as string;

		try {
			const { token } = await loginUser(username, password);
			setAuthToken(cookies, token);
		} catch (error) {
			if (error instanceof InvalidUserCredentialsError) {
				return fail(400, { error: error.message });
			} else if (error instanceof Error) {
				return fail(500, { error: error.message });
			} else {
				return fail(500, {});
			}
		}

		throw redirect(302, '/');
	}
} satisfies Actions;
