"use strict";

var emailField = document.getElementById("email-field");
var passwordField = document.getElementById("password-field");
var submitButton = document.getElementById("submit-button");
var resultLabel = document.getElementById("result");

Rx.Observable.fromEvent(emailField, "keyup").pluck("target", "value").subscribe(function (x) {
  // console.log("email: " + x)
});

Rx.Observable.fromEvent(passwordField, "keyup").pluck("target", "value").subscribe(function (x) {
  // console.log("password: " + x)
});

Rx.Observable.fromEvent(submitButton, "click").map(undefined).subscribe(function (x) {
  // console.log("button clicked")
});

// More DRY

function TextObservable(text) {
  var eventObservable = Rx.Observable.fromEvent(text, "keyup").pluck("target", "value");
  return Rx.Observable.concat(Rx.Observable.return(""), eventObservable);
}

function ButtonObservable(button) {
  return Rx.Observable.fromEvent(button, "click").map(undefined);
}

var email = TextObservable(emailField);
var password = TextObservable(passwordField);
var submit = ButtonObservable(submitButton);

function contains(sequence) {
  return function (value) {
    return sequence.reduce(function (acc, elem) {
      return acc && value.toLowerCase().indexOf(elem.toLowerCase()) != -1;
    }, true);
  };
}

function isEmpty(value) {
  return value.length <= 0;
}

function isValidEmail(email) {
  return contains(["@", ".com"])(email);
}

function isValidPassword(password) {
  return password.length > 6;
}

var validEmail = email.map(isValidEmail);
var hasEmail = email.map(isEmpty);

var displayValidEmail = Rx.Observable.combineLatest(hasEmail, validEmail).map(function (validation) {
  return validation[0] || validation[1];
});

var validPassword = password.map(isValidPassword);
var hasPassword = password.map(isEmpty);

var displayValidPassword = Rx.Observable.combineLatest(hasPassword, validPassword).map(function (validation) {
  return validation[0] || validation[1];
});

// Let's simplify

function zipValidations(validation1, validation2) {
  return Rx.Observable.combineLatest(validation1, validation2).map(function (validation) {
    return validation[0] || validation[1];
  });
}

var emailIsValid = zipValidations(hasEmail, validEmail);
var passwordIsValid = zipValidations(hasPassword, validPassword);

var buttonEnabled = Rx.Observable.combineLatest(validEmail, validPassword).map(function (enabled) {
  return enabled[0] && enabled[1];
});

// Update UI

emailIsValid.subscribe(function (isValid) {
  if (isValid) {
    emailField.className = "text-field";
  } else {
    emailField.className = "text-field invalid";
  }
});

passwordIsValid.subscribe(function (isValid) {
  if (isValid) {
    passwordField.className = "text-field";
  } else {
    passwordField.className = "text-field invalid";
  }
});

buttonEnabled.subscribe(function (enabled) {
  submitButton.disabled = !enabled;
  if (enabled) {
    submitButton.className = "button enabled";
  } else {
    submitButton.className = "button disabled";
  }
});

submit.flatMapLatest(function (_) {
  return Rx.DOM.ajax({ url: "https://api.github.com/zen", responseType: "string" });
}).subscribe(function (data) {
  resultLabel.textContent = "Success!";
}, function (err) {
  resultLabel.textContent = "Failure :'(";
});
