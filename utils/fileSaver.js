const { writeFile } = require("fs").promises;
const { join } = require("path");
class FileSaver {
  static async save(mergedFile, fileName) {
    console.log('Starting to save file');
    const fileOut = join(`${process.cwd()}/${process.env.FILE_SAVE_LOCATION}/`, `/${fileName}`);
    await writeFile(fileOut, mergedFile, "binary");
  }
}
module.exports = { FileSaver };
