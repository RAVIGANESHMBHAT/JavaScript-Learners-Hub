/** 
Given an object,
```const obj = {
    a: {
        b: (a, b, c) => a + b + c,
        c: (a, b, c) => a + b - c,
    },
    d: (a, b, c) => a - b - c
}```

Create a function `Fn(obj)(1,1,1)` which mutates the obj where the value of any attribute is a function by executing that function
by applying the parameters passed to Fn(obj).

Eg: Fn(obj)(1, 1, 1) will mutate the obj into,
`{ a: { b: 3, c: 1 }, d: -1 }`
*/

const calculateValue = (obj) => {
    return function (...args) {
      for (let key in obj) {
        const val = obj[key];
        if (typeof val === "function") {
          obj[key] = val(...args);
        } else if (val && typeof val === "object" && !Array.isArray(val)) {
          calculateValue(val)(...args);
        }
      }
    };
  };
  
  const obj = {
    a: {
      b: (a, b, c) => a + b + c,
      c: (a, b, c) => a + b - c,
    },
    d: (a, b, c) => a - b - c,
  };
  
  calculateValue(obj)(1, 1, 1);
  
  console.log(obj); // { a: { b: 3, c: 1 }, d: -1 }
  