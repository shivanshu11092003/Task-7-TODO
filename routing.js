let response =  fetch("https://dummyjson.com/todos")
async function getteacher() {

    const json = await response.json()
    console.log(json)
}
getteacher()
var myApp = angular.module("todoApp", ["ui.router"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/todo");
    var helloState = {
      name: "todo",
      url: "/todo",
      templateUrl: "todotemplate.html",
      controller: "TodoListController",
    };

  
    $stateProvider.state(helloState);

  });
  myApp.controller("TodoListController", function () {

    console.log(reponse)
  

  });