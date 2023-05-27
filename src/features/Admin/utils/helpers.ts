export const confirmChoice = (callback: CallableFunction) => {
  if (confirm('Are you sure?')) return callback();
};
