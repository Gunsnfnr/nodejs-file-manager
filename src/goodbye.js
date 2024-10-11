const sayByeWhenExit = (username) => {
  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });
};

export { sayByeWhenExit };
