"use strict";

angular.module("TodoApp").controller("ItemNewCtrl", function($scope) {
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

  };
});
