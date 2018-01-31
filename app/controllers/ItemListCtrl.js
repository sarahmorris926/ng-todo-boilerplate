"use strict";

angular
  .module("TodoApp")
  .controller("ItemListCtrl", function($scope, FilterFactory, ItemFactory) {
    $scope.searchTerm = FilterFactory;

    ItemFactory.getTodoItems()
      .then(itemsData => {
        if (itemsData.length > 0) {
          $scope.items = itemsData;
        } else {
          $scope.message = "Looks like you need to add some todo items!";
        }
      })
      .catch(err => {
        console.log(err);
      });

    $scope.deleteTodoItem = itemId => {
      ItemFactory.deleteItem(itemId)
        .then(() => {
          // console.log("item deleted", data); no data returned on a delete
          ItemFactory.getTodoItems()
            .then(itemsData => {
              console.log("itemsData after delete", itemsData);
              $scope.items = itemsData;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log("Item not deleted", err);
        });
    };
  });
