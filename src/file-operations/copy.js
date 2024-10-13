import * as fsPromises from "node:fs/promises";
import os from "os";
import path from "node:path";
import { access } from "node:fs/promises";
import { createReadStream, createWriteStream } from "fs";

const copy = async (userInput) => {
  const pathToFileAndPathToNewDir = userInput
    .trim()
    .slice(3)
    .replace(os.EOL, "")
    .trim()
    .split(" ");

  if (pathToFileAndPathToNewDir.length !== 2) {
    return console.error("Invalid input");
  }

  const [pathToFile, pathToNewDir] = pathToFileAndPathToNewDir;
  const newPathToFile = path.join(pathToNewDir, path.parse(pathToFile).base);

  try {
    await access(newPathToFile);
    console.error("Operation failed.");
    console.error(`Invalid input: file ${newPathToFile} already exists.`);
  } catch (err) {
    try {
      await access(pathToFile);

      const readStream = createReadStream(pathToFile, "utf-8");
      const writeStream = createWriteStream(newPathToFile, "utf-8");
      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("File copied successfully.");
        writeStream.close();
      });
    } catch (err) {
      console.error("Operation failed.");
    }
  }
};

export { copy };
