import { DEFAULT_PROFILE_IMAGE } from "../view/utils/constant";
import { auth, db, apiResponse } from "./api/firebase";

const signup = (email, password, username, callback) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log("sign up then", response.user.uid);
      addUser(
        {
          id: response.user.uid,
          username,
          email,
          avatar: response.user.photoURL
            ? response.user.photoURL
            : DEFAULT_PROFILE_IMAGE,
        },
        callback
      );
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log("sign up error", error.message);
      callback(apiResponse(false, "Fail to sign up.", null));
    });
};

const addUser = (user, callback) => {
  console.log("addUser", user);
  db.collection("users")
    .doc(user.id)
    .set(user)
    .then(() => {
      console.log("addUser then");
      callback(apiResponse(true, "Add user successfully.", user));
    })
    .catch(function (error) {
      console.log("addUser error", error.message);
      callback(apiResponse(false, "Fail to add user.", null));
    });
};

const getSingleUser = (userId, callback) => {
  console.log(userId);
  db.collection("users")
    .doc(userId)
    .get()
    .then(function (doc) {
      console.log("Getting single user sucessfully.", doc.data());
      const user = doc.data();
      callback(apiResponse(true, "Getting single user sucessfully.", user));
    })
    .catch(function (error) {
      console.error("Error when getting single user: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const getSingleUserByEmail = (email, callback) => {
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      let users = [];
      querySnapshot.forEach(function (doc) {
        var user = doc.data();
        users.push(user);
      });

      if (users.length === 1)
        callback(apiResponse(true, "Getting course sucessfully.", users[0]));
      else callback(apiResponse(false, "Couldn't find the user", null));
    })
    .catch(function (error) {
      console.error("Error when finding user: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const signin = async (email, password, callback) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return apiResponse(true, "Sign in sucessfully.", null);
  } catch (error) {
    return apiResponse(false, "Fail to sign in.", null);
  }
};

const signout = async () => {
  try {
    await auth.signOut();
    return apiResponse(true, "Sign out sucessfully.", null);
  } catch (error) {
    return apiResponse(false, "Fail to sign out.", null);
  }
};

const resetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return apiResponse(
      true,
      "Check email for changing password instructions.",
      null
    );
  } catch (error) {
    return apiResponse(false, "There's an error! Please try again.", null);
  }
};

const updateEmail = async (currentUser, email) => {
  try {
    await currentUser.updateEmail(email);
    return apiResponse(
      true,
      "Check email for changing email instructions.",
      null
    );
  } catch (error) {
    return apiResponse(false, "There's an error! Please try again.", null);
  }
};

const updatePassword = async (currentUser, password) => {
  try {
    await currentUser.updatePassword(password);
    return apiResponse(
      true,
      "Check email for changing password instructions.",
      null
    );
  } catch (error) {
    return apiResponse(false, "There's an error! Please try again.", null);
  }
};

export {
  signup,
  signin,
  getSingleUser,
  getSingleUserByEmail,
  signout,
  resetPassword,
  updateEmail,
  updatePassword,
};
