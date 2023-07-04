
const request = require("request-promise-native");
class Downloader {
    static async downloadFile(url) {
        try {
            console.log("Starting to get file data by url:", url);
            const options = { url, encoding: "binary" };
            return await request.get(options);
          } catch (err) {
            throw new Error("Error occured while getting file data: " + err.message);
          }
    }
}
module.exports = {Downloader}
