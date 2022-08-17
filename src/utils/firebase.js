import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2hwaHoWFrVNsc0aFSragq5ZTqaOmD3o4",
  authDomain: "synthetic-app.firebaseapp.com",
  databaseURL: "https://synthetic-app.firebaseio.com",
  projectId: "synthetic-app",
  storageBucket: "synthetic-app.appspot.com",
  messagingSenderId: "71616933650",
  appId: "1:71616933650:web:500c940480895722c38dcb",
  measurementId: "G-CFL9SGPXGG"
};
let app =firebase.initializeApp(firebaseConfig);
console.log(app)
export default app