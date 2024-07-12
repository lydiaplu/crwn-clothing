import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// initial the firebase app
const firebaseApp = initializeApp(firebaseConfig);

// instance the google auth
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
})

// export auth
export const auth = getAuth();

// export sign popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// export sign at separate page
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// export initial database
export const db = getFirestore();



/** addCollectionAndDocuments */

export type ObjectToAdd = {
    title: string;
}

/**
 * add data
 * @param {*} collectionKey table name
 * @param {*} objectsToAdd the add data
 * @param {*} field 
 */
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    // the second param is table name
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        // the second param is collection name
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
}

/**
 * get data from categories table
 */
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Category);


    // this part logic will move to redux;
    // change data structure to map
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //   // get data from collection
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {});

    // return categoryMap;
}



/** createUserDocumentFromAuth */

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createAt: Date;
    displayName: string;
    email: string;
}

/**
 * export create user from google auth
 * @param {*} userAuth 
 */
export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // if the auth not exists, save the information
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

/**
 * create user by email and password
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

/**
 * sign by email and passoword
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * signout the user
 * @returns signOut - promise
 */
export const signOutUser = async () => await signOut(auth);

/**
 * listen user change, always wait to listen user
 * @param {*} callback 
 * @returns 
 */
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

/**
 * change onAuthStateChangedListener to Promise
 * @returns 
 */
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscript = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscript();
                resolve(userAuth);
            },
            reject
        )
    })
}