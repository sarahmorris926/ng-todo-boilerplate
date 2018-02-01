"use strict";

angular.module("TodoApp").controller("ItemNewCtrl", function($scope, $location, ItemFactory) {
  $scope.title = "New";
  $scope.todoItem = {
    task: "",
    isCompleted: false,
    dueDate: "",
    assignedTo: "",
    location: "",
    urgency: "low",
    dependencies: ""
  };

  $scope.saveItem = () => {
    console.log('New Item to add', $scope.todoItem );
    $scope.todoItem.uid = firebase.auth().currentUser.uid;
    ItemFactory.addNewItem($scope.todoItem)
    .then( (data) => {
      $location.url("/items/list");
    });
  };
});