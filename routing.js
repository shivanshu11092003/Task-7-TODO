var myApp = angular.module("todoApp", ["ui.router"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {

  var helloState = {
    name: "todo",
    url: "/todo",
    templateUrl: "todotemplate.html",
    controller: "TodoListController",
  };


  $stateProvider.state("todo", helloState);
  $urlRouterProvider.otherwise("/todo");


});
myApp.factory('product', function () {
  let product = []

  async function required() {
    let response = await fetch("https://dummyjson.com/todos")


    const json = await response.json()
    const array = json.todos
    console.log(array)
    return array

  }


  return required();



});
myApp.controller("TodoListController", ['product', function (product) {
  product.then((response) => {
    console.log(response)
    localStorage.setItem("data", JSON.stringify(response))
  })
  const result = localStorage.getItem("data")
  let array = JSON.parse(result)
  this.todos = array;


  this.delTodo = function (index) {
    array.splice(index, 1);
    console.log(array)
    localStorage.setItem("data", JSON.stringify(array))

  }
  this.updateTodo=  function (index) {
    let text = document.getElementById(`check${index+1}`)
    

    console.log(text)
  }




}]);