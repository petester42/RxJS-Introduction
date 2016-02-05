"use strict";

function isPrime(number) {
    var squareroot = Math.sqrt(number);
    for (var i = 2; i <= squareroot; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

var numbers = [1, 52, 4, 90, 17, 42, 72, 101, 55, 3];
var primeNumbers = numbers.filter(isPrime); //1, 17, 101, 3

console.log(primeNumbers);
