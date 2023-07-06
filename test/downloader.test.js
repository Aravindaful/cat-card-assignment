import axios from 'axios';
import { expect, jest } from '@jest/globals'
import { Downloader } from "../utils/downloadUtils.js";


// jest.mock('axios', () => {
//   return {
//     __esModule: true,
//     default: jest.fn(),
//     get: jest.fn()
//    }
// });
//jest.spyOn(axios, 'default').mockRejectedValue(new Error(errorMessage));

describe("Downloader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully download file", async () => {
    const url = "https://example.com/file.png";
    const expectedData = "file data content";
    axios.get.mockResolvedValue({ data: expectedData });

    const data = await Downloader.downloadFile(url);

    expect(axios.get).toHaveBeenCalledWith(url, {
      responseType: "arraybuffer",
    });
    expect(data).toEqual(expectedData);
  });

  it("should throw an error when download fails", async () => {
    const url = "https://example.com/file.png";
    const errorMessage = "Download failed";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(Downloader.downloadFile(url)).rejects.toThrowError(
      `Error occurred while getting file data: ${errorMessage}`
    );

    expect(axios.get).toHaveBeenCalledWith(url, {
      responseType: "arraybuffer",
    });
  });
});
