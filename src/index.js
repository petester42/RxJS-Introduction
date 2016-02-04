"use strict";

/* global Rx */

var emailField = document.getElementById("emailField");
var passwordField = document.getElementById("passwordField");
var submitButton = document.getElementById("submitButton");

Rx.Observable.fromEvent(emailField, "keyup").pluck("target", "value").subscribe(function (x) {
    console.log("email: " + x);
});

Rx.Observable.fromEvent(passwordField, "keyup").pluck("target", "value").subscribe(function (x) {
    console.log("password: " + x);
});

Rx.Observable.fromEvent(submitButton, "click").map(undefined).subscribe(function (x) {
    console.log("button clicked");
});

// Not very DRY

function TextObservable(text) {
    return Rx.Observable.fromEvent(text, "keyup").pluck("target", "value");
}

function ButtonObservable(button) {
    return Rx.Observable.fromEvent(button, "click").map(undefined);
}

TextObservable(emailField).subscribe(function (x) {
    console.log("new email: " + x);
});

TextObservable(passwordField).subscribe(function (x) {
    console.log("new password: " + x);
});

ButtonObservable(submitButton).subscribe(function (x) {
    console.log("new button clicked");
});
