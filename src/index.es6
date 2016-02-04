/* global Rx */

let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField")
let submitButton = document.getElementById("submitButton")

Rx.Observable.fromEvent(emailField, "keyup")
    .pluck("target", "value")
    .subscribe(x => {
        console.log("email: " + x)
    })


Rx.Observable.fromEvent(passwordField, "keyup")
    .pluck("target", "value")
    .subscribe(x => {
        console.log("password: " + x)
    })

Rx.Observable.fromEvent(submitButton, "click")
    .map(undefined)
    .subscribe(x => {
        console.log("button clicked");
    })
    
// Not very DRY
    
function TextObservable(text) {
    return Rx.Observable.fromEvent(text, "keyup")
        .pluck("target", "value")
}

function ButtonObservable(button) {
    return Rx.Observable.fromEvent(button, "click")
        .map(undefined)
}

TextObservable(emailField)
    .subscribe(x => {
        console.log("new email: " + x)
    })

TextObservable(passwordField)
    .subscribe(x => {
        console.log("new password: " + x)
    })

ButtonObservable(submitButton)
    .subscribe(x => {
        console.log("new button clicked");
    })