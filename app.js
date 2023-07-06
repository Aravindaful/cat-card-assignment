import { MergeStrategyFactory } from "./mergeStrategyFactory.js";
import { FileSaver } from "./utils/fileSaver.js";
import { CONSTANT } from "./config/contant.js";

export class App {
  constructor(greeting, who, width, height, color, size, fileName) {
    this.greeting = greeting || CONSTANT.GREETING;
    this.who = who ?? CONSTANT.WHO;
    this.width = width || CONSTANT.WIDTH;
    this.height = height || CONSTANT.HEIGHT;
    this.color = color || CONSTANT.COLOR;
    this.size = size || CONSTANT.SIZE;
    this.fileName = fileName || CONSTANT.FILE_NAME;
  }

  async mergeAndSave() {
    try {
      const assetType = CONSTANT.ASSET_TYPE;
      const mergeStrategy = MergeStrategyFactory.createMergeStrategy(
        assetType,
        this.greeting,
        this.who,
        this.width,
        this.height,
        this.color,
        this.size
      );
      const downloadedFiles = await mergeStrategy
        .getDownloadedFiles()
        .catch((err) => {
          throw err;
        });

      const mergedFile = await mergeStrategy
        .merge(downloadedFiles)
        .catch((err) => {
          throw err;
        });

      const fileSaveLocation = mergeStrategy.getFileSaveLocation();
      if (!fileSaveLocation) {
        console.warn("File save location not found!");
        throw new Error(`File save location not found!`);
      }

      await FileSaver.save(mergedFile, this.fileName, fileSaveLocation).catch(
        (err) => {
          throw err;
        }
      );
    } catch (err) {
      throw new Error(`Error while merging files: ${err.message}`);
    }
  }
}
