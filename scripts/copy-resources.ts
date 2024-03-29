import * as fs from "fs";
import * as path from "path";
import * as shell from "shelljs";

const out = path.join(__dirname, "..", "dist");
createFolderIfNotExist(out);

createFolderIfNotExist(path.join(out, "config"));

shell.cp("-R", "src/config/*.yml", "dist/config");

function createFolderIfNotExist(outDir: string): void {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
}
