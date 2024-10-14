import os from "os";
import { changeDirectory } from "./change-directory.js";
import { listDirectory } from "./list-directory.js";
import { read } from "./file-operations/read.js";
import { create } from "./file-operations/create.js";
import { rename } from "./file-operations/rename.js";
import { copy } from "./file-operations/copy.js";
import { remove } from "./file-operations/remove.js";
import { getFilePathsFromUserInput } from "./file-operations/utils/get-file-paths-from-user-input.js";
import { getEol } from "./os/get-eol.js";
import { getCpus } from "./os/get-cpus.js";
import { getHomedir } from "./os/get-homedir.js";
import { getUsername } from "./os/get-user-name.js";
import { getArchitecture } from "./os/get-architecture.js";
import { calculateHash } from "./hash/hash.js";
import { compress } from "./zip/compress.js";
import { getFilePathsForCompressOps } from "./zip/utils/get-file-paths-from-user-input.js";
import { decompress } from "./zip/decompress.js";

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

      case chunk.toString() === `os --EOL${os.EOL}`:
        getEol();
        break;

      case chunk.toString() === `os --cpus${os.EOL}`:
        getCpus();
        break;

      case chunk.toString() === `os --homedir${os.EOL}`:
        getHomedir();
        break;

      case chunk.toString() === `os --username${os.EOL}`:
        getUsername();
        break;

      case chunk.toString() === `os --architecture${os.EOL}`:
        getArchitecture();
        break;

      case chunk.toString().startsWith("hash "):
        await calculateHash(chunk.toString());
        break;

      case chunk.toString().startsWith("compress "):
        try {
          const [pathToFile, pathToDestination] = getFilePathsForCompressOps(
            chunk.toString(),
            9
          );
          if (pathToFile && pathToDestination)
            await compress(pathToFile, pathToDestination);
        } catch (err) {
          if (err.message.includes("ENOENT")) {
            console.error("Operation failed.");
          } else {
            console.error(err.message);
          }
        }
        break;

      case chunk.toString().startsWith("decompress "):
        try {
          const [pathToFile, pathToDestination] = getFilePathsForCompressOps(
            chunk.toString(),
            11
          );
          if (pathToFile && pathToDestination)
            await decompress(pathToFile, pathToDestination);
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
