import { ImageMergeStrategy } from "./mergeStrategies/imageMergeStrategy.js";

export class MergeStrategyFactory {
  static createMergeStrategy(
    assetType,
    greeting,
    who,
    width,
    height,
    color,
    size
  ) {
    switch (assetType) {
      case "image":
        return new ImageMergeStrategy(
          greeting,
          who,
          width,
          height,
          color,
          size
        );
      case "video":
        // Logic for video merge strategy
        // return new VideoMergeStrategy(greeting, who, width, height, color, size);
        break;
      default:
        throw new Error("Unsupported asset type.");
    }
  }
}
