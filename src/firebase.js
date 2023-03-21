import firebase from 'firebase/compat/app' 
// what is the need of below these imports 
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHehgcG8uqpuEKDDjAIUpZwjWT93Fonm8",
  authDomain: "reels-jatin-1.firebaseapp.com",
  projectId: "reels-jatin-1",
  storageBucket: "reels-jatin-1.appspot.com",
  messagingSenderId: "462306541182",
  appId: "1:462306541182:web:31753a70d3276e8e19622f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments: firestore.collection('comments'), // text,uProfile,uName - id    , all the id's will be stored in comments arr of specific post
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp()
}
export const storage = firebase.storage();