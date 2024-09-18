import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAW9wE1YSPl3g2cWA7tfpsUi_p0yUeRotY",
  authDomain: "blog-ceea9.firebaseapp.com",
  projectId: "blog-ceea9",
  storageBucket: "blog-ceea9.appspot.com",
  messagingSenderId: "51719191844",
  appId: "1:51719191844:web:f6c542e91b823f4bf847b1"
};

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)

 export {auth}