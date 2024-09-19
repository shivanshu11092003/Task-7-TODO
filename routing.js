var myApp = angular.module("todoApp", ["ui.router"]);

// myApp.config(function ($stateProvider, $urlRouterProvider) {
//   var homeState = {
//     name: "todo",
//     url: "/todo",
//     templateUrl: "todotemplate.html",
//     controller: "TodoListController",
//   };
//   var loginState = {
//     name: "login",
//     url:"/login",
//     templateUrl:"login.html",
//     controller:"loginController"

//   }



//   $stateProvider.state("todo", homeState);
//   $stateProvider.state("login", loginState);
//   $urlRouterProvider.otherwise("/login");
// });

myApp.config(function ($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: "todo",
    url: "/todo",
    templateUrl: "todotemplate.html",
    controller: "TodoListController",
  };
  var loginState = {
    name: "login",
    url:"/login",
    templateUrl:"login.html",
    controller:"loginController"

  }



  $stateProvider.state("todo", homeState);
  $stateProvider.state("login", loginState);
  $urlRouterProvider.otherwise("/login");
});

myApp.service("service", [
  "$http",
  function ($http) {

    const baseURL = "https://10.21.98.170:8001/todo/"



    var service = {};

    var loginPostRequest = {
      method: "Get",
      url: `${baseURL}log_in/main/`,
    };

    service.getData = function () {
      return $http(loginPostRequest,{
        withCredentials: true
    }).then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
          console.log(response.data.todos);
          console.log(response);

          service.data = response.data.todos;
        }
      });
    };

    service.getData();
    console.log(service.getData());

    return service;
  },
]);


myApp.controller("loginController", ["$http", "$location", function ($http, $location) {


  const baseURL = "https://10.21.98.170:8001/todo/"



  this.logIn = function () {

      var pass = false
      const usernameRegex = /^[a-zA-Z]{4,15}.[_]+[0-9]*$/
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      const username = this.username
      const password = this.password

      if (username != "" && username.match(usernameRegex)) {
          pass = true;
          document.getElementById("msgUsername").innerText = ""

      } else {
          document.getElementById("msgUsername").innerText = "must four char,undescore and number"

      }
      if (password != "" && password.match(passwordRegex)) {
          pass = true;
          document.getElementById("msgpassword").innerText = ""

      } else {
          document.getElementById("msgpassword").innerText = "must 8 char,special char and number"

      }
      console.log(username)


      if (pass) {
          console.log(username)
          var loginPostRequest = {
              method: 'Post',
              url: `${baseURL}log_in/`,
              data: {
                  username: username,
                  password: password
              },
          }

          $http(loginPostRequest, {
              withCredentials: true
          }).then(function (response) {
              console.log(response.status)

              if (response.status == 200) {
                  localStorage.setItem("username", username)
                  // console.log(response.data.session_id)
                  // setCookie("sessionid",response.data.session_id,13.5)
                  // localStorage.setItem("sessionID", response.data.session_id)
                  $location.url('/todo')


                  // location.assign("http://127.0.0.1:5502/todo.html#!/todo")




              }
              else {

                  document.getElementById("msgpassword").innerText = "wrong password"

              }

          }).catch((error) => {
              console.log(error)
          })


      } else {
          document.getElementById("pmsg").innerText = "something is wrong"

      }

  }


  this.redirect = function () {
      location.assign("http://127.0.0.1:5502/register.html")
  }










}])




myApp.controller("TodoListController", [
  "$http",
  "service",
  function ($http, service) {
    console.log(service);

    this.service = service

    this.addTodo = function () {
      const newText = this.todoText;
      const saveUserusername = localStorage.getItem("username");

      var addTodoPostRequest = {
        method: "Post",
        url: `${baseUrl}add/`,
        data: {
          username: saveUserusername,
          task: this.todoText,
        },
      };

      $http(addTodoPostRequest,{
        withCredentials: true
    }).then(function (index) {
        console.log("Added");
      });

      this.todoText = "";
    };

    this.delTodo = function (index) {
      const saveUserusername = localStorage.getItem("username");

      console.log(index.target);
      const delId = index.target.id;

      console.log(delId);
      var delTodoPostRequest = {
        method: "Delete",
        url: `${baseUrl}delete/`,
        data: {
          username: saveUserusername,
          id: delId,
        },
      };

      $http(delTodoPostRequest).then(function (response) {
        console.log("Del" + response.status);
        // myarray.splice(index, 1);
      });
    };

    this.updateTodo = function (event) {
      const saveUserusername = localStorage.getItem("username");

      const changeId = event.target.id;

      const item = document.getElementById(`todo${changeId}`);
      const oldText = item.innerText;


      // item.innerHTML = `<input class="updateTodo" id="updateTodo" type="text" placeholder="updateTodo" ng-model="todoList.newTodoText" value=${oldText}  required> 
      // <button class="todobtn" id="savebtn${changeId}" saveBtn ng-click="todoList.saveTodo($event)"><img class="icon" src="https://cdn-icons-png.flaticon.com/512/2874/2874091.png" alt=""></button>`;
      console.log(oldText);
      console.log(item);

      // document.getElementById(`saveBtn${changeId}`).addEventListener("click", () => {
      //   const newText = document.getElementById("updateTodo").value;

      //   if (newText != "") {
      //     // item.innerHTML = ``;
      //     // item.innerText = newText;
      //     // var patchTodoPostRequest = {
      //     //   method: "Patch",
      //     //   url: "http://10.21.99.17:8000/todo/update/",
      //     //   data: {
      //     //     username: saveUserusername,
      //     //     id: changeId,
      //     //     text: newText,
      //     //   },
      //     // };
      //     // $http(patchTodoPostRequest).then(function (response) {
      //     //   console.log("update  " + response.status);
      //     //   // myarray.splice(index, 1);
      //     // });
      //   }
      // });

      //<span class="done-false ng-not-empty" id="todo107" ng-model="todo.task">1</span>
    };

    this.updateStatus = function (event) {
      const saveUserusername = localStorage.getItem("username");

      const changeId = event.target.id;
      console.log(changeId);

      var updateStatusRequest = {
        method: "Patch",
        url: `${baseURL}complete/`,
        data: {
          username: saveUserusername,
          id: changeId
        },
      };
      $http(updateStatusRequest,{
        withCredentials: true
    }).then(function (response) {
        console.log("update  " + response.status);
        // myarray.splice(index, 1);
      });


    };


    this.logout = function(){
      const baseURL = "https://10.21.98.170:8001/todo/"
      const saveUserusername = localStorage.getItem("username");

      console.log(baseURL)

      var updateStatusRequest = {
        method: "Post",
        url: `${baseURL}log_in/main/log_out/`,
      };


      $http(updateStatusRequest,{
        withCredentials: true
    }).then(function (response) {
        console.log("update  " + response.status);
        // myarray.splice(index, 1);

        if(response.status == 200){

      sessionStorage.removeItem("username")
      sessionStorage.removeItem("password")

      location.assign("http://127.0.0.1:5502/login.html")


        }else{
          console.log("update  " + response.status);

        }
      });


      
    }
  },
]);
