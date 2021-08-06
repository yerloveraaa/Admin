const functions =  require('firebase-functions')
const app = require('express')();
var cors = require('cors')




const { signUpUser} = require('./Apis/users') 

app.use(cors({origin: true, credentials: true}));
app.post('/signup', signUpUser);


exports.api = functions.https.onRequest(app)
