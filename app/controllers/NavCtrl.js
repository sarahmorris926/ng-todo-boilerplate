"use strict";

angular
  .module("TodoApp")
  .controller("NavCtrl", function(
    $scope,
    $rootScope,
    $location,
    $window,
    FilterFactory,
    AuthFactory
  ) {
    $scope.searchTerm = FilterFactory;
    $scope.isActive = viewLocation => viewLocation === $location.path();

    $scope.navItems = [
      // TODO: Hide/Show login/out
      {
        name: "Logout",
        url: "#!/logout"
      },
      {
        name: "Login",
        url: "#!/login",
        bang: "!"
      },
      {
        name: "All Items",
        url: "#!/items/list"
      },
      {
        name: "Add New Item",
        url: "#!/items/new"
      }
    ];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.$apply($scope.isLoggedIn = true);
        console.log("currentUser logged in?", user.uid);
        console.log("logged in t-f", $scope.isLoggedIn);
      } else {
        $scope.isLoggedIn = false;
        console.log("user logged in?", $scope.isLoggedIn);
        $scope.$apply();
        $window.location.href = "#!/login";
      }
    });

    $scope.navigate = navUrl => {
      console.log("navUrl", navUrl);
      if (navUrl === "#!/logout") {
        AuthFactory.logoutUser();
      } else {
        $window.location.href = navUrl;
      }
    };
  });