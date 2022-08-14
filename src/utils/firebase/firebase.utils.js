import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';
//firestore database
import { 
    getFirestore,
    doc, //nos permite recuperar documentos dentron de nuestra base de datos
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApZpfG7YlPFqry754hGlawpQ3XahsATw8",
    authDomain: "clotheshop-746fd.firebaseapp.com",
    projectId: "clotheshop-746fd",
    storageBucket: "clotheshop-746fd.appspot.com",
    messagingSenderId: "836245981116",
    appId: "1:836245981116:web:5c0528b3e06dfbd226cdb9"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
           await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
           });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};