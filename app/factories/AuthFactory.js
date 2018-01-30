"use strict";

angular.module("TodoApp").factory("AuthFactory", FBCreds => {
  let createUser = function(userObj) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(userObj.email, userObj.password)
      .catch(function({code, message}) {
        console.log("Oops", code, message);
      });
  };
});
