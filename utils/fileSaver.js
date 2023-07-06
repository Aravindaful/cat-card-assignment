import { promises as fsPromises } from "fs";
import { join } from "path";

export class FileSaver {
   /* 
  This method use to save file into the given location
  parameters : 
        file: file data
        fileName : saving file name
        location: file save location
  */
  static async save(file, fileName, location) {
    try {
      console.log("Starting to save file");
      const fileOut = join(
        `${process.cwd()}/${location}`,
        fileName
      );
      await fsPromises.writeFile(fileOut, file, "binary").catch((err) => {
        console.error("Error while saving file:", err);
        throw err;
      });
      console.log("File saved successfully");
    } catch (err) {
      console.error("Error occured during file saving process:", err);
      throw err; 
    }
  }
}
