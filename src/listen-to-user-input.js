import os from "os";
import { changeDirectory } from "./change-directory.js";
import { listDirectory } from "./list-directory.js";
import { read } from "./file-operations/read.js";
import { create } from "./file-operations/create.js";
import { rename } from "./file-operations/rename.js";
import { copy } from "./file-operations/copy.js";
import { remove } from "./file-operations/remove.js";
import { getFilePathsFromUserInput } from "./file-operations/utils/get-file-paths-from-user-input";

const listenToUserInput = (username) => {
  process.stdin.on("data", async (chunk) => {
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

      case chunk.toString() === `ls${os.EOL}`:
        listDirectory();
        break;

      case chunk.toString().startsWith("cat "):
        await read(chunk.toString());
        break;

      case chunk.toString().startsWith("add "):
        await create(chunk.toString());
        break;

      case chunk.toString().startsWith("rn "):
        await rename(chunk.toString());
        break;

      case chunk.toString().startsWith("cp "):
        try {
          const [pathToFile, newPathToFile] = getFilePathsFromUserInput(
            chunk.toString()
          );
          if (pathToFile && newPathToFile)
            await copy(pathToFile, newPathToFile, true);
        } catch (err) {
          if (err.message.includes("ENOENT")) {
            console.error("Operation failed.");
          } else {
            console.error(err.message);
          }
        }
        break;

      case chunk.toString().startsWith("rm "):
        const pathToFile = chunk.toString().trim().slice(3).replace(os.EOL, "");
        await remove(pathToFile, false);
        break;

      case chunk.toString().startsWith("mv "):
        try {
          const [pathToFile, newPathToFile] = getFilePathsFromUserInput(
            chunk.toString()
          );
          if (pathToFile && newPathToFile) {
            await copy(pathToFile, newPathToFile, false);
            await remove(pathToFile, true);
          }
        } catch (err) {
          if (err.message.includes("ENOENT")) {
            console.error("Operation failed.");
          } else {
            console.error(err.message);
          }
        }
        break;

      default:
        console.error("Invalid input.");
    }
  });
};

export { listenToUserInput };
