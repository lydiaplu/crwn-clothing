import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { User } from "firebase/auth";
import { USER_ACTION_TYPES } from "./user.types";
import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from "./user.action";
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        // invoke createUserDocumentFromAuth
        // pass in userAuth, additionalDetails
        const userSnapshop = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );

        if (userSnapshop) {
            console.log("user.saga.js - userSnapshop: ", userSnapshop);
            console.log("user.saga.js - userSnapshop data: ", userSnapshop.data());

            // dispatch SIGN_IN_SUCCESS
            yield* put(signInSuccess({ id: userSnapshop.id, ...userSnapshop.data() }))
        }

    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

// action: { payload: { email, password } }
export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            yield* call(getSnapshotFromUserAuth, userCredential.user);
        }

    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCredential) {
            yield* put(signUpSuccess(userCredential.user, { displayName }));
        }

    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signOut() {
    try {
        // here invoke signOutUser in firebase
        // will sign out user
        yield* call(signOutUser);
        // get signout action
        // dispatch it to SIGN_OUT_SUCCESS reducer
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

// action: { payload: { user, additionalDetails } }
export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    // monitor SIGN_OUT_START
    // when dispatch it, will invoke signOut
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}