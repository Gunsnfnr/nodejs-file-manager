import os from "os";

const goodbye = (username) => {
  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });

  process.stdin.on("data", (chunk) => {
    console.log("chunk.toString(): ", chunk.toString());
    if (chunk.toString() === `.exit${os.EOL}`) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }
  });
};

export { goodbye };
