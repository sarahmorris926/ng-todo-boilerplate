"use strict";

angular
  .module("TodoApp")
  .controller("ItemDetailCtrl", function($scope, ItemFactory, $routeParams) {
    ItemFactory.getTodoItem($routeParams.id).then(item => {
      console.log(item);
      item.id = $routeParams.id;
      $scope.selectedItem = item;
    });
  });