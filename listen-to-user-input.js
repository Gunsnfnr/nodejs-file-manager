import os from "os";

const listenToUserInput = (username) => {
  process.stdin.on("data", (chunk) => {
    if (chunk.toString() === `.exit${os.EOL}`) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    } else if (chunk.toString() === `up${os.EOL}`) {
      process.chdir("..");
      console.log(`You are currently in ${process.cwd()}`);
    } else {
      console.log(`Invalid input`);
    }
  });
};

export { listenToUserInput };
