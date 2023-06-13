// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { verify_session_cookie } from '$lib/admin';
import { COOKIES_DELETE } from '$lib/constants/cookies';

// When I go to "/login" (register etc) this hook fn checks if I'm logged
// and if I'm, it redirects me to "/profile" page
export const handle = async ({ event, resolve }) => {
	const architctr_session = event.cookies.get('architctr_session');

	// not logged in
	if (!architctr_session) {
		event.locals.decoded_claims = null;

		// route protection
		if (event.url.pathname.startsWith('/profile')) {
			throw redirect(303, '/');
		}
		if (event.url.pathname.startsWith('/add')) {
			throw redirect(303, '/');
		}
		const response = await resolve(event);
		return response;
	}

	const decoded_claims = await verify_session_cookie(architctr_session);
	event.locals.decoded_claims = decoded_claims;
	// non verified user:
	if (decoded_claims?.email_verified === false) {
		if (event.url.pathname.startsWith('/add')) {
			throw redirect(303, '/');
		}
	}

	// revoked cookie:
	if (!decoded_claims) {
		event.cookies.set('architctr_session', '', COOKIES_DELETE);
		throw redirect(303, '/login'); // there's a cookie, but revoked - I purposely return null, and not let it just die in catch in verify_session_cookie fn
	}

	// already logged in:
	if (
		event.url.pathname.startsWith('/login') ||
		event.url.pathname.startsWith('/register') ||
		event.url.pathname.startsWith('/reset-password')
	) {
		if (decoded_claims) {
			throw redirect(302, '/profile');
		}
	}

	// resolve fn renders the route, then generates a Response
	const response = await resolve(event);
	return response;
};

export async function handleError({ error, event }) {
	const errorId = crypto.randomUUID();
	console.log('___ handleError: ', error, event);

	return {
		message: 'Whoops!',
		errorId
	};
}
