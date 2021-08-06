
const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");


firebase.initializeApp(config);

const { validateSignUpData } = require("../util/validators");
exports.signUpUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    id: request.body.id,
    photo: request.body.photo,
    photos: request.body.photos
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return response.status(400).json(errors);

  let token, userId;
  db
    .doc(`/users/${newUser.id}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response.status(400).json({ id: 'this id is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
          );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        firstName: newUser.firstName,
        photo: newUser.photo,
        photos: newUser.photos,
        lastName: newUser.lastName,
        id: newUser.id,
        phoneNumber: newUser.phoneNumber,
        country: newUser.country,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db
        .doc(`/users/${newUser.id}`)
        .set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return response.status(400).json({ email: 'Email already in use' });
      } else {
        return response.status(500).json({ general: 'Something went wrong, please try again' });
      }
    });
}
