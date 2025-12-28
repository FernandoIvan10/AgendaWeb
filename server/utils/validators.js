const areStrings = (...args) => {// Check if all arguments are strings
  return args.every(arg => typeof arg === 'string');
}

module.exports = {
  areStrings,
};