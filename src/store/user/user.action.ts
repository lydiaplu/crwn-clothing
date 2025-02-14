import { USER_ACTION_TYPES } from "./user.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";


// set currentUser
export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>

export const setCurrentUser = withMatcher(
    (user: UserData): SetCurrentUser =>
        createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
)

// check User session
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export const checkUserSession = withMatcher(
    (): CheckUserSession =>
        createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
)


// sign with google or email
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = withMatcher(
    (): GoogleSignInStart =>
        createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
)

// sign with email start
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart =>
        createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
)

// sign in success or fail
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>

export const signInSuccess = withMatcher(
    (user: UserData & { id: string }): SignInSuccess =>
        createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
)

// sign in failed
export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>

export const signInFailed = withMatcher(
    (error: Error): SignInFailed =>
        createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
)

// sign up start
export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string; password: string; displayName: string }>

export const signUpStart = withMatcher(
    (email: string, password: string, displayName: string): SignUpStart =>
        createAction(USER_ACTION_TYPES.SIGN_UP_START, {
            email,
            password,
            displayName
        })
)

// sign up success
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user: User; additionalDetails: AdditionalInformation }>

export const signUpSuccess = withMatcher(
    (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
        createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
)

// sign up failed
export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>

export const signUpFailed = withMatcher(
    (error: Error): SignUpFailed =>
        createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
)

// sign out start
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export const signOutStart = withMatcher(
    (): SignOutStart =>
        createAction(USER_ACTION_TYPES.SIGN_OUT_START)
)

// sign out success
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>

export const signOutSuccess = withMatcher(
    (): SignOutSuccess =>
        createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
)

// sign out faild
export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>

export const signOutFailed = withMatcher(
    (error: Error): SignOutFailed =>
        createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
)