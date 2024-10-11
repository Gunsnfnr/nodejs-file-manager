import os from "os";

const listenToUserInput = (username) => {
  process.stdin.on("data", (chunk) => {
    if (chunk.toString() === `.exit${os.EOL}`) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }
  });
};

export { listenToUserInput };
