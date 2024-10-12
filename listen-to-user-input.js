import os from "os";
import { changeDirectory } from "./src/change-directory.js";

const listenToUserInput = (username) => {
  process.stdin.on("data", (chunk) => {
    if (chunk.toString() === `.exit${os.EOL}`) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    } else if (chunk.toString() === `up${os.EOL}`) {
      process.chdir("..");
      console.log(`You are currently in ${process.cwd()}`);
    } else if (chunk.toString().startsWith("cd ")) {
      changeDirectory(chunk);
    } else {
      console.error(`Invalid input`);
    }
  });
};

export { listenToUserInput };
