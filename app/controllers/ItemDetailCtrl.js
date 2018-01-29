"use strict";

angular.module("TodoApp").controller("ItemDetailCtrl", function($scope, ItemFactory, $routeParams) {

  let todoItems = ItemFactory.getTodoItem($routeParams.id)
  .then( (item) => {
    $scope.selectedItem = item;
  });

});
