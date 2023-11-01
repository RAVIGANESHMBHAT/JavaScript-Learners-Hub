const createPromise = () => {
    const value = Math.floor(Math.random(10) * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(value > 5) {
                resolve(`Success ${value}`);
            } else {
                reject(`Error ${value}`)
            }
        }, value * 1000)
    })
  };
  
  const promisesList = [
      createPromise(),
      createPromise(),
      createPromise(),
      createPromise(),
      createPromise()
  ]
  
  const executeInSequence = (promisesList, callback) => {
    const total = promisesList.length;
    let completed = 0;
    const success = [],
      error = [];
  promisesList
      .reduce((prev, curr) => {
        return prev
          .then(() => {
            return curr
              .then((res) => success.push(res))
              .catch((err) => error.push(err));
          })
          .finally(() => {
            completed++;
            if (completed === total) {
              callback(error, success);
            }
          });
      }, Promise.resolve())
      .catch((err) => {
        callback(error, success);
      });
  };
  
  executeInSequence(promisesList, (err, res) => {
    console.log("Error = ", err);
    console.log("success = ", res);
  });