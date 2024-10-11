import os from "os";

let username;
let currentDir;
const salutation = () => {
  for (let i = 0; i < process.argv.length; i += 1) {
    if (process.argv[i].startsWith("--username=")) {
      username = process.argv[i].replace("--username=", "");
    }
  }
  console.log(`Welcome to the File Manager, ${username}!`);
  currentDir = os.userInfo().homedir;
  process.chdir(currentDir);
  console.log(`You are currently in ${currentDir}`);
  process.stdin.resume();
};

export { salutation, username, currentDir };
