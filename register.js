var myRegister = angular.module("registerApp", ["ui.router"]);


myRegister.config(function ($stateProvider, $urlRouterProvider) {

})

myRegister.controller("registerController", ["$http", function ($http) {

    this.register = function () {
        var pass = false
        const usernameRegex = /^[a-zA-Z]{4,15}.[_]+[0-9]*$/
        const nameRegex = /^[A-Z]+[a-z]{2,25}$/
        const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]+[@][a-z]+[\.][a-z]{2,}$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        const username = this.username;
        const fname = this.fname;
        const lname = this.lname
        const email = this.email
        const password = this.password
        const confirmpassword = this.confirmpassword

        if (username != "" && username.match(usernameRegex)) {
            pass = true;
            document.getElementById("msgUsername").innerText = ""

        } else {
            document.getElementById("msgUsername").innerText = "must four char,undescore and number"

        }
        if (fname != "" && fname.match(nameRegex)) {
            pass = true;
            document.getElementById("msgfname").innerText = ""

        } else {
            document.getElementById("msgfname").innerText = "first char should alphabet"

        }
        if (lname != "" && lname.match(nameRegex)) {
            pass = true;
            document.getElementById("msglname").innerText = ""

        } else {
            document.getElementById("msglname").innerText = "first char should alphabet"

        }
        if (email != "" && email.match(emailRegex)) {
            pass = true;
            document.getElementById("msgemail").innerText = ""

        } else {
            document.getElementById("msgemail").innerText = "must be in exam@gmail.com"

        }
        if (password != "" && password.match(passwordRegex)) {
            pass = true;
            document.getElementById("msgpassword").innerText = ""

        } else {
            document.getElementById("msgpassword").innerText = "must 8 char,special char and number"

        }
        if (confirmpassword != "" && confirmpassword.match(password)) {
            pass = true;
            document.getElementById("msg").innerText = ""

        } else {
            document.getElementById("msg").innerText = "incorrect"

        }

        if(pass){

        console.log(username)
        var registerPostRequest = {
            method: 'Post',
            url: 'https://10.21.97.60:8000/account/user_register/',
            data: {
                username: username,
                first_name: fname,
                last_name: lname,
                email: email,
                password: password,
                cpassword: confirmpassword
            },
        }

        $http(registerPostRequest,{
            // withCredentials: true
        }).then(function (response) {
            console.log(response.status)
            if (response.status == 201) {
                location.assign("http://127.0.0.1:5501/login.html")
            }
            else {
                
                document.getElementById("msg").innerText = "something went wrong"

            }

        })


        }else{
            document.getElementById("msg").innerText = "all filed are required"

        }




    }

    this.redirect = function(){
        location.assign("http://127.0.0.1:5502/login.html")

    }





}])