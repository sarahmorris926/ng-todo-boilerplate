"use strict";

angular.module("TodoApp").controller("ItemListCtrl", function($scope, FilterFactory, ItemFactory) {

  $scope.searchTerm = FilterFactory;

  $scope.items = ItemFactory.getTodoItems();

});
