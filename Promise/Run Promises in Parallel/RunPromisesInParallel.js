// Execute async tasks in parallel
function createAsyncTask() {
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
}

let tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

const asyncParallel = (tasks, callback) => {
  const results = [],
    errors = [],
    totalTasks = tasks.length;
  let completed = 0;

  return tasks.forEach((task) => {
    task
      .then((res) => results.push(res))
      .catch((err) => errors.push(err))
      .finally(() => {
        completed++;
        if (completed === totalTasks) {
          callback(errors, results);
        }
      });
  });
};

asyncParallel(tasks, (error, result) => {
  console.log("Error: ", error);
  console.log("Pass: ", result);
});
