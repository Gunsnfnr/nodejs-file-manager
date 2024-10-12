import os from "os";
import { changeDirectory } from "./src/change-directory.js";

const listenToUserInput = (username) => {
  process.stdin.on("data", (chunk) => {
    switch (true) {
      case chunk.toString() === `.exit${os.EOL}`:
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
        break;
      case chunk.toString() === `up${os.EOL}`:
        process.chdir("..");
        console.log(`You are currently in ${process.cwd()}`);
        break;
      case chunk.toString().startsWith("cd "):
        changeDirectory(chunk);
        break;
      default:
        console.error(`Invalid input`);
    }
  });
};

export { listenToUserInput };
