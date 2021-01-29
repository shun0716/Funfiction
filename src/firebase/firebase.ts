import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
// export const FieldValue = firebase.firestore.FieldValue;
export const datetime = () => {
  // let now = new Date();
  // let yaer = now.getFullYear();
  // let Month = now.getMonth() + 1;
  // let Day = now.getDate();
  // let Hour = now.getHours();
  // let Min = now.getMinutes();
  // // let Sec = now.getSeconds();
  // const nowDate = yaer + "/" + Month + "/" + Day + "/" + Hour + ":" + Min;
  // return nowDate;
  return format(new Date(), "Pp", { locale: ja });
};
