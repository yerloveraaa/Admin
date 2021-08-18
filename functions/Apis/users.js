const { admin, db, messaging } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const { validateSignUpData } = require("../util/validators");

const geo = require('geofirex').init(admin);

exports.signUpUser = (request, response) => {
  const position = geo.point(40, -119);
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    role: request.body.role,
    id: request.body.id,
    vendorID: request.body.vendorID,
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return response.status(400).json(errors);

  let token,  userID;
  db.doc(`/users/${newUser.id}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ id: "this username is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        vendorID: newUser.vendorID,
        createdAt: new Date(),
        badgeCount: 0,
        isOnline: true,
        profilePictureURL: "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg",
        lastOnlineTimestamp:  new Date(),
        pushKitToken: '',
        pushToken: '',
        signUpLocation: position,
        userID,
        appIdentifier: 'rn-restaurant-android'
  
      };
      return db.doc(`/users/${newUser.id}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return response
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};



