const promisify = (fn, context) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(context, [
        ...args,
        (err, res) => (err ? reject(err) : resolve()),
      ]);
    });
  };
};

module.exports = promisify;
