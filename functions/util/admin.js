const admin = require('firebase-admin')

var serviceAccount = require("./jmsdevstudio.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jmsdevstudio-default-rtdb.firebaseio.com",
  storageBucket: "jmsdevstudio.appspot.com"
});

const db = admin.firestore()
const messaging = admin.messaging()
module.exports = { admin, db, messaging};

