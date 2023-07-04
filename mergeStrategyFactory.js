const { ImageMergeStrategy } = require("./mergeStrategies/imageMergeStrategy");

class MergeStrategyFactory {
  static createMergeStrategy(assetType,greeting, who, width, height, color, size) {
    if (assetType === "image") {
      return new ImageMergeStrategy(greeting, who, width, height, color, size);
    } else if (assetType === "video") {
      // if we need to use video format then we can use a seperate file
    } else {
      throw new Error("Unsupported asset type.");
    }
  }
}

module.exports = { MergeStrategyFactory };
