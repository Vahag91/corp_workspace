import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUBuP_TsKsxiWeKh_GJsTEni81fQxz5AQ",
  authDomain: "trello-68dec.firebaseapp.com",
  projectId: "trello-68dec",
  storageBucket: "trello-68dec.appspot.com",
  messagingSenderId: "236841900884",
  appId: "1:236841900884:web:fbd8cfe795540f365786c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
