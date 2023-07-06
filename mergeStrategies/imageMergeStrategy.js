import mergeImg from "merge-img";
import { MergeStrategy } from "./mergeStrategy.js";
import { Downloader } from "../utils/downloadUtils.js";

export class ImageMergeStrategy extends MergeStrategy {
  constructor(greeting, who, width, height, color, size) {
    super(greeting, who, width, height, color, size);
    this.firstFile;
  }

  getFileSaveLocation() {
    return process.env.FILE_SAVE_LOCATION;
  }
  async getDownloadedFiles() {
    try {
      console.log("Starting to download merge files");
      const firstReqUrl = this.buildImageUrl(this.greeting);
      const secondReqUrl = this.buildImageUrl(this.who);
      console.log("First image URL:", firstReqUrl);
      console.log("Second image URL:", secondReqUrl);
      const firstBody = await Downloader.downloadFile(firstReqUrl).catch(
        (err) => {
          console.error("Error while download first file:", err);
          throw err;
        }
      );
      const secondBody = await Downloader.downloadFile(secondReqUrl).catch(
        (err) => {
          console.error("Error while download second file:", err);
          throw err;
        }
      );

      if (!firstBody || !secondBody) {
        console.log("First image data:", firstBody);
        console.log("Second image data:", secondBody);
        throw new Error("Image data not downloaded");
      }

      return [firstBody, secondBody];
    } catch (error) {}
  }

  async merge(files) {
    try {
      console.log("Starting to merge files");

      const mergedImageBuffer = await this.mergeImagesBuffers(files).catch(
        (err) => {
          console.error("An error occured while merging image buffers:", err);
          throw err;
        }
      );

      console.log("Images merged successfully");
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

  async mergeImagesBuffers(files) {
    try {
      console.log("Starting to merge image buffers");
      const convertedFiles = files.map((f) => {
        return { src: Buffer.from(f, "binary"), x: 0, y: 0 };
      });
      const mergedImageData = await mergeImg(convertedFiles).catch((err) => {
        console.error("Error occured while merging images: " + err.message);
        throw err;
      });
      return await this.getImageBuffer(mergedImageData);
    } catch (err) {
      throw new Error("Error while merging images process: " + err.message);
    }
  }

  async getImageBuffer(mergedImage) {
    return new Promise((resolve, reject) => {
      mergedImage.getBuffer("image/jpeg", (err, buffer) => {
        if (err) {
          console.log("Failed to get image buffer:", err);
          return reject(err);
        }
        resolve(buffer);
      });
    });
  }
}
