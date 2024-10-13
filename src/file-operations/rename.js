import * as fsPromises from "node:fs/promises";
import { access } from "node:fs/promises";
import os from "os";
import path from "node:path";

const rename = async (userInput) => {
  const pathToFileAndFileName = userInput
    .trim()
    .slice(3)
    .replace(os.EOL, "")
    .trim()
    .split(" ");
  if (pathToFileAndFileName.length !== 2) {
    return console.error("Invalid input");
  }
  const [pathToFile, fileName] = pathToFileAndFileName;
  const newPathToFile = path.join(path.dirname(pathToFile), fileName);

  try {
    await access(newPathToFile);
    console.error("Operation failed.");
    console.error(`Invalid input: file ${fileName} already exists.`);
    return;
  } catch (err) {
    try {
      await fsPromises.rename(pathToFile, newPathToFile);
      console.log(`The file was successfully renamed.`);
    } catch (err) {
      console.error("Operation failed.");
    }
  }
};

export { rename };
