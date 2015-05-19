# TypeScript @spy decorator

Inspired by [SinonJS](http://sinonjs.org/) and [Decorators & metadata reflection in TypeScript: From Novice to Expert](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)

## Lights!
```
class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}
```
## Camera!

```
import spy = require("spy-decorator");

class CalculatorSpy extends Calculator {
  public spies: any; // Set by decorator
  @spy
  public sume(a : number, b : number) : number {
    return super.sume(a, b);
  }
  @spy
  public multiply(a : number, b : number) : number {
    return super.multiply(a, b);
  }
}

var calculatorSpy = new CalculatorSpy();

```
## Action!
```
// sume spy

calculatorSpy.sume(2, 3);
calculatorSpy.sume(5, 5);

console.log(calculatorSpy.spies.sume.called());       // true
console.log(calculatorSpy.spies.sume.calledOnce());   // false
console.log(calculatorSpy.spies.sume.calledTwice());  // true
console.log(calculatorSpy.spies.sume.calledThrice()); // false
console.log(calculatorSpy.spies.sume.callCount());    // 2
console.log(calculatorSpy.spies.sume.threw());        // false

console.log(calculatorSpy.spies.sume.calls); // see image bellow
console.log(calculatorSpy.spies.sume.firstCall()); // calculatorSpy.spies.multiply.calls[0]
console.log(calculatorSpy.spies.sume.firstCall().returnValue); // 5

// multiply spy

calculatorSpy.multiply(2, 3);
calculatorSpy.multiply(5, 5);

console.log(calculatorSpy.spies.multiply.called());       // true
console.log(calculatorSpy.spies.multiply.calledOnce());   // false
console.log(calculatorSpy.spies.multiply.calledTwice());  // true
console.log(calculatorSpy.spies.multiply.calledThrice()); // false
console.log(calculatorSpy.spies.multiply.callCount());    // 2
console.log(calculatorSpy.spies.multiply.threw());        // false

console.log(calculatorSpy.spies.multiply.calls); // see image bellow
console.log(calculatorSpy.spies.multiply.firstCall()); // calculatorSpy.spies.multiply.calls[0]
console.log(calculatorSpy.spies.multiply.firstCall().returnValue); // 6
```
![multiply calls](https://upload.wikimedia.org/wikipedia/commons/a/a3/Multiply_calls.png)

## What exactly @spy is able to spy?
Take a look to interfaces to get a sneak peek of what's coming:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)


## Work in progress - Contributions are wellcome!

There are a good few not implemented methods at:
- [/source/spy.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.ts)
- [/source/function_call.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.ts)

If you are going to contribute check interfaces for implementation details:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)

Please don't forget to add unit test id you do contribute!
