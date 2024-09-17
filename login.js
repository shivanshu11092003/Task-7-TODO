

var loginApp = angular.module("loginApp", ["ui.router"]);




loginApp.controller("loginController", ["$http", function ($http) {
    

    var loginGetRequest = {
        method: 'GET',
        url: 'http://10.21.96.174:8000/todo/log_in/',
    }

    $http(loginGetRequest).then(function (response) {
        console.log(response.status)

        if (response.status == 200) {
            localStorage.setItem("username", username)
            // console.log(response.data.session_id)
            // setCookie("sessionid",response.data.session_id,13.5)
            // localStorage.setItem("sessionID", response.data.session_id)
            console.log("bye bye")
            
            location.assign("http://127.0.0.1:5502/todo.html#!/todo")


            
            
        }

    }).catch((error) =>{
        console.log(error)
    })

    this.logIn = function(){

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
                url: 'http://10.21.96.174:8000/todo/log_in/',
                data: {
                    username: username,
                    password: password
                },
            }
    
            $http(loginPostRequest).then(function (response) {
                console.log(response.status)
       
                if (response.status == 200) {
                    localStorage.setItem("username", username)
                    // console.log(response.data.session_id)
                    // setCookie("sessionid",response.data.session_id,13.5)
                    // localStorage.setItem("sessionID", response.data.session_id)
   
                    
                    location.assign("http://127.0.0.1:5502/todo.html#!/todo")


                    
                    
                }
               else{
                
                document.getElementById("msgpassword").innerText = "wrong password"

               }
    
            }).catch((error) =>{
                console.log(error)
            })
    
    
        } else {
            document.getElementById("pmsg").innerText = "something is wrong"
    
        }

    }


    this.redirect = function(){
        location.assign("http://127.0.0.1:5502/register.html")
    }


  

  





}])
