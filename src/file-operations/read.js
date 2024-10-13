import { access, readFile } from "node:fs/promises";
import os from "os";

const line = "-".repeat(process.stdout.columns);
const read = async (userInput) => {
  const pathToFile = userInput.slice(4).replace(os.EOL, "");
  try {
    await access(pathToFile);
    const content = await readFile(pathToFile, {
      encoding: "utf8",
    });
    console.log(line);
    console.log("File content:");
    console.log(line);
    console.log(content);
    console.log(line);
  } catch (err) {
    console.error("Operation failed.");
  }
};

export { read };
