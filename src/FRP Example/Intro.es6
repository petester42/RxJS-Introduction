let emailField = document.getElementById("email-field");
let passwordField = document.getElementById("password-field")
let submitButton = document.getElementById("submit-button")
let resultLabel = document.getElementById("result")

Rx.Observable.fromEvent(emailField, "keyup")
.pluck("target", "value")
.subscribe(x => {
  // console.log("email: " + x)
})


Rx.Observable.fromEvent(passwordField, "keyup")
.pluck("target", "value")
.subscribe(x => {
  // console.log("password: " + x)
})

Rx.Observable.fromEvent(submitButton, "click")
.map(undefined)
.subscribe(x => {
  // console.log("button clicked")
})

// More DRY

function TextObservable(text) {
  return Rx.Observable.fromEvent(text, "keyup")
  .pluck("target", "value")
}

function ButtonObservable(button) {
  return Rx.Observable.fromEvent(button, "click")
  .map(undefined)
}

let email = Rx.Observable.concat(Rx.Observable.return(""), TextObservable(emailField))
let password = Rx.Observable.concat(Rx.Observable.return(""), TextObservable(passwordField))
let submit = ButtonObservable(submitButton)

function contains(sequence) {
  return function (value) {
    return sequence.reduce((acc, elem) => {
      return acc && value.toLowerCase().indexOf(elem.toLowerCase()) != -1
    }, true)
  }
}

function isEmpty(value) {
  return value.length <= 0
}

function isValidEmail(email) {
  return contains(["@", ".com"])(email)
}

function isValidPassword(password) {
  return password.length > 6
}

let validEmail = email.map(isValidEmail)
let hasEmail = email.map(isEmpty)

let displayValidEmail = Rx.Observable.combineLatest(hasEmail, validEmail).map(validation => {
  return validation[0] || validation[1]
})

let validPassword = password.map(isValidPassword)
let hasPassword = password.map(isEmpty)

let displayValidPassword = Rx.Observable.combineLatest(hasPassword, validPassword).map(validation => {
  return validation[0] || validation[1]
})

// Let's simplify

function zipValidations(validation1, validation2) {
  return Rx.Observable.combineLatest(validation1, validation2).map(validation => {
    return validation[0] || validation[1]
  })
}

let emailIsValid = zipValidations(hasEmail, validEmail)
let passwordIsValid = zipValidations(hasPassword, validPassword)

let buttonEnabled = Rx.Observable.combineLatest(validEmail, validPassword).map(enabled => {
  return enabled[0] && enabled[1]
})

// Update UI

emailIsValid.subscribe(isValid => {
  if (isValid) {
    emailField.className = "text-field"
  } else {
    emailField.className = "text-field invalid"
  }
})

passwordIsValid.subscribe(isValid => {
  if (isValid) {
    passwordField.className = "text-field"
  } else {
    passwordField.className = "text-field invalid"
  }
})

buttonEnabled.subscribe(enabled => {
  submitButton.disabled = !enabled
  if (enabled) {
    submitButton.className = "button enabled"
  } else {
    submitButton.className = "button disabled"
  }
})

submit.flatMapLatest(_ => {
  return Rx.DOM.ajax({ url: "https://api.github.com/zen", responseType: "string"})
}).subscribe(
  function (data) {
    resultLabel.textContent = "Success!"
  },
  function (err) {
    resultLabel.textContent = "Failure :'("
  }
)
