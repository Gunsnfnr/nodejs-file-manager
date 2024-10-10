let username;
const salutation = () => {
  for (let i = 0; i < process.argv.length; i += 1) {
    if (process.argv[i].startsWith("--username=")) {
      username = process.argv[i].replace("--username=", "");
    }
  }
  console.log(`Welcome to the File Manager, ${username}!`);
  if (username) process.stdin.resume();
  return username;
};

export { salutation, username };
