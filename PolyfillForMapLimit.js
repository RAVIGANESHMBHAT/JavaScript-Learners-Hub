// LeetCode Link: https://leetcode.com/discuss/interview-question/2409192/Uber-or-Phone-Screen-or-Senior-Front-End-Engineer

// Implement mapLimit, which is a utility function that produces a list of outputs by mapping each input through an asynchronous iteratee functi

// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
// input: The input being processed.
// callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

/* function getNameById(id, callback) {
    // simulating async request
    const randomRequestTime = Math.floor(Math.random()* 100) + 200;
    setTimeout(() = {
        callback("User" + id);
    }, randomRequestTime);
}
function mapLimit (inputs, limit, iterateeFn, callback) {
    // implement here
}

//example:
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
    console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
}); */

function getNameById(id, callback) {
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

const chop = (input, limit) => {
  let i = 0;
  const results = [];

  while (i < input.length) {
    results.push(input.slice(i, i + limit));
    i += limit;
  }

  return results;
};

function mapLimit(inputs, limit, iterateeFn, callback) {
  const chopped = chop(inputs, limit);
  let completed = 0;
  console.log(chopped);

  const finalResult = chopped.reduce((prev, current) => {
    return prev.then(
      (val) =>
        new Promise((resolve, reject) => {
          const temp = [];
          current.forEach((e) => {
            iterateeFn(e, (result) => {
              temp.push(result);

              if (temp.length === current.length) {
                resolve([...val, ...temp]);
              }
            });
          });
        })
    );
  }, Promise.resolve([]));

  finalResult.then((result) => {
    callback(result);
  });
}

mapLimit([1, 2, 3, 4, 5, 6, 7], 2, getNameById, (allResults) => {
  console.log("Output: ", allResults);
});
