import os from "os";

const getArchitecture = () => {
  console.log(
    `The operating system CPU architecture for which the Node.js binary was compiled: ${os.arch()}.`
  );
};

export { getArchitecture };
