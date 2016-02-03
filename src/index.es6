/* global Rx */

let emailLabel = document.getElementById("emailLabel")
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField")
let submitButton = document.getElementById("submitButton")

Rx.Observable.fromEvent(emailField, "keyup").subscribe(x => {
    emailLabel.textContent = x.target.value
})