"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person(name, email) {
        _classCallCheck(this, Person);

        this.name = name;
        this.email = email;
    }

    _createClass(Person, null, [{
        key: "getEmail",
        value: function getEmail(person) {
            return person.email;
        }
    }]);

    return Person;
}();

function zip(arrays) {
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
            return array[i];
        });
    });
}

function contains(sequence) {
    return function (values) {
        return values.indexOf(sequence) != -1;
    };
}

var emails = ["test@mail.com", "garbage", "email@"];
var names = ["Jimmy", "Dave", "Tyler"];

var zipped = zip([names, emails]);

// [["Jimmy", "test@mail.com"], ["Dave", "garbage"], ["Tyler", "email@"]]
console.log(zipped);

var people = zipped.map(function (item) {
    return new Person(item[0], item[1]);
});

// [Person {name: "Jimmy", email: "test@mail.com"}, Person {name: "Dave", email: "garbage"}, Person {name: "Tyler", email: "email@"}
console.log(people);

var vaildEmails = people.filter(function (person) {
    return contains(".com")(Person.getEmail(person));
});

// [Person {name: "Jimmy", email: "test@mail.com"}]
console.log(vaildEmails);
