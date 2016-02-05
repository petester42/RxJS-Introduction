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

let emails = ["test@mail.com", "garbage", "email@"]
let names = ["Jimmy", "Dave", "Tyler"]

let zipped = zip([names, emails])

// [["Jimmy", "test@mail.com"], ["Dave", "garbage"], ["Tyler", "email@"]]
console.log(zipped)

let people = zipped.map(item => new Person(item[0], item[1])) 

// [Person {name: "Jimmy", email: "test@mail.com"}, Person {name: "Dave", email: "garbage"}, Person {name: "Tyler", email: "email@"}
console.log(people)

let vaildEmails = people.filter(person => contains(".com")(Person.getEmail(person))) 
    
// [Person {name: "Jimmy", email: "test@mail.com"}]
console.log(vaildEmails)