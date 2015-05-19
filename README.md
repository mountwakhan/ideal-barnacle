# TypeScript @spy decorator

Inspired by [SinonJS](http://sinonjs.org/) and [Decorators & metadata reflection in TypeScript: From Novice to Expert](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)

## Code
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
## Spy

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
```
## Test
```
var calculator = new CalculatorSpy();

// sume spy

calculator.sume(2, 3);
calculator.sume(5, 5);

calculator.spies.sume.called();                    // true
calculator.spies.sume.calledOnce();                // false
calculator.spies.sume.calledTwice();               // true
calculator.spies.sume.calledThrice();              // false
calculator.spies.sume.callCount();                 // 2
calculator.spies.sume.threw();                     // false
calculator.spies.sume.calls;                       // FunctionCall[] (see image bellow)
calculator.spies.sume.firstCall();                 // calls[0] (see image bellow)
calculator.spies.sume.firstCall().returnValue;     // 5
calculator.spies.sume.secondCall().args;           // [5,5]

// multiply spy

calculator.multiply(2, 3);
calculator.multiply(5, 5);

calculator.spies.multiply.called();                // true
calculator.spies.multiply.calledOnce();            // false
calculator.spies.multiply.firstCall().args;        // [2,3]
calculator.spies.multiply.firstCall().returnValue; // 6
```
![multiply calls](https://upload.wikimedia.org/wikipedia/commons/a/a3/Multiply_calls.png)

## What exactly @spy is able to spy?
Take a look to interfaces to get a sneak peek of what's coming:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)


## Work in progress - Pull request are welcome!

There are a good few not implemented methods at:
- [/source/spy.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.ts)
- [/source/function_call.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.ts)

If you are going to contribute check interfaces for implementation details:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)

Please don't forget to add unit test id you do contribute!
