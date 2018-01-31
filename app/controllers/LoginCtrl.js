"use strict";

angular
  .module("TodoApp")
  .controller("LoginCtrl", function($scope, AuthFactory, $window) {
    $scope.test = "hello";

    // TODO: Grab the user form info and send it to AuthFactory
    // for register / login / logout -- hmm. Maybe rename this Ctrl?
    $scope.register = () => {
      AuthFactory.createUser($scope.account).then(user => {
        console.log("newUser", user);
        $scope.login();
      })
      .catch(function({code, message}) {
        console.log("Oops", code, message);
      });
    };

    $scope.login = () => {
      AuthFactory.loginUser($scope.account).then(user => {
        console.log("logged in user", user);
        $window.location.href = "#!/items/list";
      })
      .catch( (err) => {
        console.log(err);
      });
    };

    $scope.logout = () => {
      AuthFactory.logoutUser()
      .then( (data) => {
        console.log("logged out", data);
      });
    };
    // $scope.logout();
  });
