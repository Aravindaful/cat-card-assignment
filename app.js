const { MergeStrategyFactory } = require("./mergeStrategyFactory");
const { FileSaver } = require("./utils/fileSaver");
const CONSTANT = require("./config/contant");

class App {
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
      const mergedFile = await mergeStrategy.merge();
      await FileSaver.save(mergedFile, this.fileName);
    } catch (err) {
      throw new Error("Error while merging files: " + err.message);
    }
  }
}

module.exports = { App };
