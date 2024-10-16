import * as fs from "node:fs";
import path from "node:path";
import os from "os";
import { access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { stdout } from "node:process";

const calculateHash = async (userInput) => {
  try {
    const pathToFile = userInput.slice(5).trim().replace(os.EOL, "");
    await access(pathToFile);
    const readStream = fs.createReadStream(pathToFile);

    const hash = createHash("sha256");

    readStream.on("data", (dataChunk) => {
      hash.update(dataChunk);
      console.log(`Hash calculated for the content of file ${pathToFile}:`);
      console.log(hash.digest("hex"));
    });
  } catch (err) {
    console.error("Operation failed.");
  }
};

export { calculateHash };
