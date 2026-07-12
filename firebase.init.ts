// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




























// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPaXV9KPLF79ERl8OELk9QDFR0e4CI_iw",
    authDomain: "smartcare-6f23c.firebaseapp.com",
    projectId: "smartcare-6f23c",
    storageBucket: "smartcare-6f23c.firebasestorage.app",
    messagingSenderId: "400016463505",
    appId: "1:400016463505:web:4ac1c54b3ea54a15e09130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);





