// @ts-nocheck
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { PUBLIC_CLIENT_EMAIL, PUBLIC_PROJECT_ID, PUBLIC_PRIVATE_KEY } from '$env/static/public';
// import { PROJECT_STAGE } from '$lib/constants/stages.js';
// import { FETCH_LIMIT } from '$lib/client';

import { getAuth } from 'firebase-admin/auth'; // https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth
// import { getStorage } from 'firebase-admin/storage'; // https://firebase.google.com/docs/reference/admin/node/firebase-admin.storage
// import { getFirestore } from 'firebase-admin/firestore'; // https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore

const adminConfig = {
	credential: cert({
		client_email: PUBLIC_CLIENT_EMAIL,
		project_id: PUBLIC_PROJECT_ID,
		private_key: PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n')
	})
};

const get_admin_app_instance = () => (getApps().length ? getApp() : initializeApp(adminConfig));

const auth = getAuth(get_admin_app_instance());
// const storage = getStorage(get_admin_app_instance());
// const firestore = getFirestore(get_admin_app_instance());

const verify_session_cookie = async (session_cookie) => {
	try {
		const decoded_claims = await auth.verifySessionCookie(
			session_cookie,
			true // checkRevoked
		);
		console.log('admin.verify_session_cookie SUCCESS: ', decoded_claims);
		return decoded_claims;
	} catch (error) {
		console.error('___ verify_session_cookie ERROR: ', error);
		return null; // see: https://firebase.google.com/docs/auth/admin/manage-cookies#node.js_2
	}
};

export {
	// Auth / User:
	// patch_user,
	// update_user,
	// get_user_by_uid,
	// delete_user_by_uid,
	// revoke_session_cookie,
	verify_session_cookie
	// get_cookie,
	// // Blog:
	// get_initial_blogs,
	// get_blog_post,
	// get_blog_post_markdown_content_url,
	// // Project:
	// get_projects_initial
};
