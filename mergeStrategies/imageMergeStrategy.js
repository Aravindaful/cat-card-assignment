const mergeImg = require("merge-img");
const { MergeStrategy } = require("./mergeStrategy");
const { Downloader } = require("../utils/downloadUtils");
class ImageMergeStrategy extends MergeStrategy {
  constructor(greeting, who, width, height, color, size) {
    super(greeting, who, width, height, color, size);
  }
  async merge() {
    try {
      console.log("Starting to merge files");
      const firstReqUrl = this.buildImageUrl(this.greeting);
      const secondReqUrl = this.buildImageUrl(this.who);
      console.log("First image url:", firstReqUrl);
      console.log("Second image url:", secondReqUrl);
      const firstBody = await Downloader.downloadFile(firstReqUrl);
      const secondBody = await Downloader.downloadFile(secondReqUrl);

      if (!firstBody || !secondBody) {
        console.log("First image data:", firstBody);
        console.log("Second image data:", secondBody);
        throw new Error("Image data not downloaded");
      }
      const mergedImageBuffer = await this.mergeImagesBuffers(
        firstBody,
        secondBody
      );
      console.log(
        "Images merged successfully" );
      return mergedImageBuffer;
    } catch (err) {
      throw new Error("Error while merging images: " + err.message);
    }
  }

  buildImageUrl(text) {
    return `${process.env.MEDIA_BASE_URL}/${encodeURIComponent(text)}?width=${
      this.width
    }&height=${this.height}&color=${this.color}&s=${this.size}`;
  }

  async mergeImagesBuffers(firstImage, secondImage) {
    try {
      console.log("Starting to merge image buffers");
      const mergedImageData = await mergeImg([
        { src: Buffer.from(firstImage, "binary"), x: 0, y: 0 },
        { src: Buffer.from(secondImage, "binary"), x: this.width, y: 0 },
      ]);
      return await this.getImageBuffer(mergedImageData);
    } catch (err) {
      throw new Error("Error while merging image buffers: " + err.message);
    }
  }

  async getImageBuffer(mergedImage) {
    return new Promise((resolve, reject) => {
      mergedImage.getBuffer("image/jpeg", (err, buffer) => {
        if (err) {
          console.log("Failed to get image buffer:", err);
          return reject(err);
        }

        return resolve(buffer);
      });
    });
  }
}

module.exports = { ImageMergeStrategy };
