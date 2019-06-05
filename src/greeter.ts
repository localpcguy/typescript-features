// interface Person { firstName: string; lastName: string };

class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return `Hello, ${this.greeting}`
  }

  greetPerson(person: { firstName: string; lastName: string }) {
    return `Hello, ${person.firstName} ${person.lastName}`
  }
}

let greeter = new Greeter('Kumanu')
console.log(greeter.greet())
// console.log(greeter.greetPerson({}))
console.log(greeter.greetPerson({ firstName: 'Mike', lastName: 'B' }))
