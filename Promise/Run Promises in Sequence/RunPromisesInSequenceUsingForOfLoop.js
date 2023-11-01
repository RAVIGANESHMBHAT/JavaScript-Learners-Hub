const createAsyncTask = () => {
  const value = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        reject(`Error ${value}`);
      } else {
        resolve(value * 1000);
      }
    }, value * 1000);
  });
};

const tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

const asyncSequence = async (tasks, callback) => {
  let results = [];
  let errors = [];

  for (let task of tasks) {
    try {
      let res = await task;
      results.push(res);
    } catch (e) {
      errors.push(e);
    }
  }

  callback(errors, results);
};

asyncSequence(tasks, (error, result) => {
  console.log("error", error);
  console.log("result", result);
});
