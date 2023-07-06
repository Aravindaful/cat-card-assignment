import axios from "axios";

export class Downloader {
  /* 
  This method use to get a file as a buffer and return the bufferd array if success
  parameter : url should be the file direct link
  */
  static async downloadFile(url) {
    try {
      console.log("Starting to download file from URL:", url);
      const response = await axios.get(url, { responseType: "arraybuffer" }).catch(err => {
        console.error('An error occured while getting file data:',err);
        throw err
      });

      if (response.status !== 200) {
        throw new Error(`Failed to download file. Status: ${response.status}`);
      }

      return response.data;
    } catch (err) {
      throw new Error(`Error occurred while downloading file: ${err.message}`);
    }
  }
}
