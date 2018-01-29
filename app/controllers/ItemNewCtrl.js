"use strict";

angular.module("TodoApp").controller("ItemNewCtrl", function($scope, $location, ItemFactory) {
  $scope.newTask = {
    task: "",
    isCompleted: false,
    dueDate: "",
    assignedTo: "",
    location: "",
    urgency: "low",
    dependencies: ""
  };

  $scope.addNewItem = () => {
    console.log('New Item to add', $scope.newTask );
    ItemFactory.addNewItem($scope.newTask)
    .then( (data) => {
      $location.url("/items/list");
    });
  };
});
