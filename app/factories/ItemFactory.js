"use strict";

angular.module("TodoApp").factory("ItemFactory", (FBUrl, $http, $q) => {

  function getTodoItems() {
    return $q((resolve, reject) => {
      $http
        .get(`${FBUrl}/items.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
        // {data} is syntax for destructuring! It's cool. New to ES6. Get used to it. We will use a lot in Node
        .then(({ data }) => {
          console.log("tasks", data);
          let taskArr = Object.keys(data).map(taskKey => {
            console.log("taskKey", taskKey);
            data[taskKey].id = taskKey;
            return data[taskKey];
          });
          console.log("taskArr", taskArr);
          resolve(taskArr);
        });
      // The above works the same as this, but without having to set an explicit var for tasks.data
      // .then(tasks => {
      //   console.log("tasks", tasks);
      //   let taskData = tasks.data;
      //   let taskArr = Object.keys(taskData).map(taskKey => {
      //     console.log("taskKey", taskKey);
      //     taskData[taskKey].id = taskKey;
      //     return taskData[taskKey];
      //   });
      //   console.log("taskArr", taskArr);
      //   resolve(taskArr);
      // })
      // .catch(err => {
      //   reject(err);
      // });
    });
  }

  function addNewItem(todoItem) {
    // todoItem.id = items.length;
    // items.push(todoItem);
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/items.json`, JSON.stringify(todoItem))
        .then(data => {
          console.log("New Item posted", data.data.name);
          resolve(data.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  function getTodoItem(todoItemId) {
    return $q((resolve, reject) => {
      $http
        .get(`${FBUrl}/items/${todoItemId}.json`)
        .then(item => {
          resolve(item.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function updateItem(todoItem, itemId) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/items/${itemId}.json`,
        JSON.stringify(todoItem)
        )
        .then((data) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function deleteItem(todoItemId) {
    return $q((resolve, reject) => {
      $http
        .delete(`${FBUrl}/items/${todoItemId}.json`)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return { getTodoItems, getTodoItem, addNewItem, updateItem, deleteItem };
});
