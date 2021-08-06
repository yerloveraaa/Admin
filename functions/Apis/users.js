
const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");


firebase.initializeApp(config);

const {  validateSignUpData } = require("../util/validators");

exports.signUpUser = (req, res) => {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      id: req.body.id,
    };
  
    const { valid, errors } = validateSignUpData(newUser);
  
    if (!valid) return res.status(400).json(errors);
  
    let token, userId;
    db.doc(`/users/${newUser.id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ id: "existe el un usuario" });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idtoken) => {
        token = idtoken;
        const userCredential = {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          country: newUser.country,
          password: newUser.password,
          confirmPassword: newUser.confirmPassword,
          id: newUser.id,
          userId,
        };
  
        return db.doc(`/users/${newUser.id}`).set(userCredential);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err.code });
      });
  };
  
  