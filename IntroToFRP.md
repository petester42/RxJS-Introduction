
## Intro To Functional Reactive Programming
### (FRP)
---
 
## Funtional Programming 
## +
## Reactive Programming

---

# Functional Programming 

Treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

Same input always equals same output

---

## Example

### Find all prime numbers in an array? 

---

```javascript

function isPrime(number) {
    let squareroot = Math.sqrt(number)
    for (var i = 2; i <= squareroot; i++) {
        if ((number % i) == 0) {
            return false
        }
    }
    return true
}

let numbers = [1, 52, 4, 90, 17, 42, 72, 101, 55, 3]
let primeNumbers = numbers.filter(isPrime) //1, 17, 101, 3

```

---

# Too simple?

---

### Take an array of names and an array of emails, create model objects and list all valid models

--- 

```javascript
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    static getEmail(person) {
        return person.email
    }
}

function zip(arrays) {
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) { return array[i] })
    });
}

function contains(sequence) {
    return function (values) {
        return values.indexOf(sequence) != -1
    }
}

```
---

```javascript
let emails = ["test@mail.com", "garbage", "email@"]
let names = ["Jimmy", "Dave", "Tyler"]

let people = zip([names, emails]) 
    // [["Jimmy", "test@mail.com"], ["Dave", "garbage"], ["Tyler", "email@"]]
    .map(item => new Person(item[0], item[1])) 
    // [Person {name: "Jimmy", email: "test@mail.com"}, Person {name: "Dave", email: "garbage"}, Person {name: "Tyler", email: "email@"}
    .filter(person => contains(".com")(Person.getEmail(person))) 
    // [Person {name: "Jimmy", email: "test@mail.com"}]
```

---

# Reacitve Programming

Changes in data will be automatically propagated through the data flow

`c = a + b`

a or b changes and c will automatically be changed (excel) 

--- 

# Functional Reactive Programming

Combines functional concepts with propagation of change

- Streams of data over times
- Transformations of data through functions
- Binding of data to components

---

# Example

## Simple Login Page

---

# Simple Login Page

- Ability to enter email
- Ability to enter password
- Ability to sumbit email and password

--- 

# Simple? Login Page

- Validate that email is valid
- Validate that password is valid
- Check that both email and password is present
- Prevent submitting multiple times in a row
...

---

# Imperative Way

### How Would You Approach This Now?

---

# FRP Way

### Demo

---
