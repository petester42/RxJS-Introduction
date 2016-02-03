"use strict";

/* global Rx */

var emailLabel = document.getElementById("emailLabel");
var emailField = document.getElementById("emailField");
var passwordField = document.getElementById("passwordField");
var submitButton = document.getElementById("submitButton");

Rx.Observable.fromEvent(emailField, "keyup").subscribe(function (x) {
    emailLabel.textContent = x.target.value;
});
