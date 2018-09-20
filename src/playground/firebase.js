import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDx-EWnm92yDg8Ynb_-RJn4JRuBcXjDiZo",
  authDomain: "expensify-fb103.firebaseapp.com",
  databaseURL: "https://expensify-fb103.firebaseio.com",
  projectId: "expensify-fb103",
  storageBucket: "expensify-fb103.appspot.com",
  messagingSenderId: "1070803259394"
};

firebase.initializeApp(config);

const database = firebase.database();

// database.ref("expenses").push({
//   description: "rent",
//   amount: 1000,
//   note: "first of the month",
//   createdAt: 3491287430913280
// });

// database.ref("expenses").push({
//   description: "car",
//   amount: 100,
//   note: "new payment",
//   createdAt: 3491284340913280
// });

// database.ref("expenses").push({
//   description: "test",
//   amount: 10,
//   note: "stuff",
//   createdAt: 3492344324213280
// });

// database.ref("expenses").on(
//   "value",
//   snapshot => {
//     const expenses = [];
//     snapshot.forEach(child => {
//       expenses.push({
//         id: child,
//         ...child.val()
//       });
//     });
//   },
//   e => {
//     console.log("error: ", error);
//   }
// );

// // child removed

// database.ref("expenses").on("child_removed", snapshot => {
//   console.log("removed :", snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", snapshot => {
//   console.log("changed :", snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_added", snapshot => {
//   console.log("added :", snapshot.key, snapshot.val());
// });

// database
//   .ref()
//   .set({
//     name: "Anthony DiFrancesco"
//   })
//   .then(() => {
//     console.log("Data is saved");
//   })
//   .catch(error => {
//     console.log("error: ", error);
//   });

// database
//   .ref()
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//   });

// const onValueChange = database.ref().on(
//   "value",
//   snapshot => {
//     console.log(snapshot.val());
//   },
//   e => {
//     console.log("Error fetching data: ", e);
//   }
// );

// database.ref("expenses").push({
//   description: "new",
//   amount: 10,
//   note: "stuff",
//   createdAt: 3492344324213280
// });
