# Typescript

Typescript is an open-source programing language, developed and maintained by Microsoft,
that is a strict syntactical superset of Javascript and adds optional static typing to the language.

Transpiles to Javascript. Unlike CoffeeScript and other similar transpiled languages, being a superset of 
Javascript means that existing JavaScript files are already Typescript files.

## History

Developed to allow for large-scale application development. Was made public in 2012 (after 2 years of 
internal development). 

Anders Hejlsberg, lead architect of C# and creator of Delphi and Turbo Pascal, is 
the lead architect for the development of Typescript.

## Value
- Guard rails
- Future of Javascript today
- Detect errors during development time
- Intellisense
- Better tooling

## Features

### Compatibility with Javascript
Typescript is a strict superset of ECMAScript 2015, which is itself a superset of ECMAScript 5, commonly referred to as Javascript. As such, a Javascript program is also a valid Typescript program, and a Typescript program can seamlessly consume Javascript. By default the compiler targets ECMAScript 5, the current prevailing standard, but is also able to generate constructs used in ECMAScript 3 or 2015.

### ECMAScript support for future features
Typescript closely follows ECMAScript and implements most proposals when they reach Stage 3. Writing 
Typescript is writing modern, standards-compliant Javascript, with typing. Stage 3 is a Candidate stage for ECMAScript, and at
that point it is likely to be accepted into the Javascript language and implementations are expected to be spec compliant. (4 is Finished)

### Type annotations and compile-time type checking
Typescript provides static typing through type annotations to enable type checking at compile time. This is optional and 
can be ignored to use the regular dynamic typing of Javascript.

 - The annotations for the primitive types are `number`, `boolean` and `string`. 
 - Arrays are denoted by putting the type and `[]` - i.e. `number[]`.
 - Weakly- or dynamically-typed structures are of type `any`.
 - `void` is the opposite of any, it is the absense of type. Variables assigned as void can only have `undefined` or `null` assigned to them.
 - `null` and `undefined` are types as well.

  let x: number = 4;
  let list: number[] = [1, 2, 3];

### Type inference
The Typescript compiler makes use of type inference to infer types when types are not given. I.E. an `add` function that takes 
two numbers and returns the sum will be inferred to return a number since that is what you get when adding two numbers. It does
require explicity declaring a function return type for the Typescript compiler to verify correctness.

Types that cannot be inferred default to `any`.

  let x = 3; // x will be inferred to be of type `number`

  function add(a: number, b: number) { return a + b }
  function add(a: number, b: number): number { return a + b }

### Type erasure
Typescript removes all type references from TS files when transpiling to Javascript. 

### Type Compatibility
Type compatibility in TypeScript is based on structural subtyping. Structural typing is a way of relating types 
based solely on their members. The basic rule for TypeScript’s structural type system is that x is compatible 
with y if y has at least the same members as x.

  interface Named {
    name: string
  }

  class Person {
    name: string
  }

  let p: Named;
  // OK, because of structural typing
  p = new Person()

### Type assertions
Type assertions are a way to tell the compiler “trust me, I know what I’m doing.” A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data. It has no runtime impact, and is used purely by the compiler.

  let strLength: number = (<string>someValue).length;
  let strLength: number = (someValue as string).length;

### Union Types
Typescript allows multiple types to be set to a variable, meaning a variable can be any one of the associated types. This 
should be used with caution as it reduces type safety.

  let x: number | string
  x = 4 // OK
  x = 'test' // OK

### Intersection Types
An intersection type combines multiple types into one. This allows composing multiple types to get a single type 
with the features you need. An object created from an intersection type will have members of all the types that 
the intersection type is composed from.

### Type aliases
Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand. 

Most useful for defining types for union types or method signatures

  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;

### Other advanced types
https://www.typescriptlang.org/docs/handbook/advanced-types.html
- String Literals
- Number Literals
- Conditional Types

### Interfaces
Interfaces describe the shape of an object. You can use an interface as the type of a variable or function return value.
Optional values allow the use of "possibly" available properties while still preventing the use of properties that are
not part of the interface. Readonly properties can only be modified when the object is created.

  interface LabeledValue {
    label: string
    width?: number
    readonly id: number
    [propName: string]: any; // allow any number of additional properties, not good practice
  }

Functions can be defined in interfaces via the call signature.

  interface SearchFunc {
    (source: string, subString: string): boolean
  }

Similarly, indexable types can have interfaces defined. There are two types of supported index signatures: `string` and `number`.

  interface StringArray {
    [index: number]: string;
  }

Classes can also have interfaces to implement. Interfaces describe the public side of the class, rather 
than both the public and private side.

  interface ClockInterface {
    currentTime: Date;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
  }

Interfaces can extend each other. Interfaces can extend Classes, but only extend the members of the class but not their implementation.

### Enumerated types
Enums allow definition of a set of named constants.

  enum Direction {
    Up = 1, // value will auto-increment from initial, defaults to 0 if not set
    Down,
    Left,
    Right,
  }

  enum Direction { // no auto-incrementation for string enums
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }

### Generics
Writing functions in terms of types to-be-specified-later that are then instantiated when needed for 
specific types provided as parameters.

  function identity<T>(arg: T): T {
    return arg;
  }

### Namespaces
  Namespaces are simply named JavaScript objects in the global namespace, that can contain both code and declarations. Allows 
  organizing types and avoiding collisions. 

  In general, modules should be preferred unless specific use cases suggest using namespacing.

  namespace Validation {
    export interface StringValidator {
      isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
      isAcceptable(s: string) {
        return lettersRegexp.test(s);
      }
    }

    export class ZipCodeValidator implements StringValidator {
      isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
      }
    }
  }

### Tuples
Tuple types allow you to express an array where the type of a fixed number of elements is known, but need not be the same.
  
  let x: [string, number];
  x = ["hello", 10]; // OK
  x = [10, "hello"]; // Error


## Featured Backported from ES6

### Classes
Object-oriented-like behavior providing syntactic sugar over protypical inheritence. Note that there are differences that the `class` 
keyword introduces, like a `constructor` method and the `super` function that is assigned to the prototype on class creation.

Properties on a class are public by default, but you can explicity state something is public with the `public` keyword also.
Marking a property `private` will prevent it's access from outside the class.

### Modules
Just like namespaces, modules can contain both code and declarations. The main difference is that modules declare their dependencies.
Modules also have a dependency on a module loader (CommonJS, Require.js, native ES2015 module support).

Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

In Typescript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

## Definition / Declaration Files

Supports definition files (*.d.ts), like C++ header files, that describe the structure of existing object files.
This is useful particularly for third-party libraries, like D3.js and similar. It allows for interop
between a Typescript codebase and third-party libraries that are not written in Typescript. These files
act as an interface to the components in the library.

  declare namespace arithmetics {
    add(left: number, right: number): number;
    subtract(left: number, right: number): number;
    multiply(left: number, right: number): number;
    divide(left: number, right: number): number;
  }
  
Large collections of declaration files for popular JavaScript libraries are hosted on GitHub in DefinitelyTyped.
 - https://github.com/DefinitelyTyped/DefinitelyTyped

## Pros and Cons

### Pros:

 - static compile time type checking
 - ~15% fewer bugs per recent study (http://ttendency.cs.ucl.ac.uk/projects/type_study/)
 - most adopters see increased productivity
 - typing is optional (i.e. can compile just JS files)
 - communicates method APIs
 - type annotations communicate original devs expectations
 - Enhances IDE support
 - strict null checks, avoid runtime null/undefined crashes
 - TS-Docs exist for most popular libraries 
 - potentially use decorators/TS files to generate Swagger


### Cons:

 - Compile step
 - Have to type code, learning curve
 - debugging means using Sourcemaps, sometimes having to look at the generated JS (it is good JS code however)
 - Some libraries may not have TS-Docs


## Resources
 - https://www.typescriptlang.org
 - https://www.typescriptlang.org/play/index.html
 - https://www.hanselminutes.com/340/what-is-typescript-and-why-with-anders-hejlsberg
 - https://blog.logrocket.com/7-bad-excuses-for-not-using-typescript-dbf5e603a9a8/
