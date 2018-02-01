"use strict";

let isAuth = (AuthFactory) =>
  new Promise((resolve, reject) => {
    AuthFactory.isAuthenticated().then(userBool => {
      console.log("user???", userBool);
      if (userBool) {
        console.log("Authenticated user. Go ahead");
        resolve();
      } else {
        console.log("Not Authenticated user. Go away");
        reject();
      }
    });
  });

angular
  .module("TodoApp", ["ngRoute"])
  .constant("FBUrl", "https://ng-todo-1554a.firebaseapp.com/")
  .config($routeProvider => {
    $routeProvider
      .when("/login", {
        templateUrl: "partials/user-form.html",
        controller: "LoginCtrl"
      })
      .when("/items/list", {
        templateUrl: "partials/item-list.html",
        controller: "ItemListCtrl",
        resolve: { isAuth }
      })
      .when("/items/new", {
        templateUrl: "partials/item-new.html",
        controller: "ItemNewCtrl",
        resolve: { isAuth }
      })
      .when("/items/deets/:id/edit", {
        templateUrl: "partials/item-new.html",
        controller: "ItemEditCtrl",
        resolve: { isAuth }
      })
      .when("/items/deets/:id", {
        templateUrl: "partials/item-details.html",
        controller: "ItemDetailCtrl",
        resolve: { isAuth }
      })
      .otherwise("/login");
  })
  .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
      apiKey: creds.key,
      authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
  });