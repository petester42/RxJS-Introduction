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

console.log(primeNumbers);