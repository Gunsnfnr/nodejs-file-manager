const showConditionalError = (err) => {
  if (err.message.includes("ENOENT")) {
    console.error("Operation failed.");
  } else {
    console.error(err.message);
  }
};

export { showConditionalError };
