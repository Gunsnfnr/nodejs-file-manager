import { readdir } from "node:fs";
import fs from "node:fs";

const listDirectory = () => {
  try {
    const table = [];
    function TableRow(name, type) {
      this.Name = name;
      this.Type = type;
    }
    const filesAndFolders = readdir(
      process.cwd(),
      { withFileTypes: true },
      (err, files) => {
        if (err) console.error("Operation failed");
        for (const unit of files) {
          const fileOrDirectory = unit.isDirectory() ? "directory" : "file";
          table.push(new TableRow(unit.name, fileOrDirectory));
        }
        table.sort((a, b) => {
          if (a.Type > b.Type) return 1;
          if (a.Type < b.Type) return -1;
        });
        console.table(table);
      }
    );
  } catch (err) {
    console.error("Operation failed");
  }
};

export { listDirectory };
