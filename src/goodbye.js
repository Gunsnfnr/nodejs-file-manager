import { styleText } from "node:util";

const sayByeWhenExit = (username) => {
  process.on("SIGINT", () => {
    console.log(
      styleText(
        ["underline", "blue"],
        `Thank you for using File Manager, ${username}, goodbye!`
      )
    );
    process.exit();
  });
};

export { sayByeWhenExit };
