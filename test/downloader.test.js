const { Downloader } = require("../utils/downloadUtils");
const request = require('request-promise-native');

jest.mock('request-promise-native', () => ({
  get: jest.fn(),
}));

describe('Downloader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully download file', async () => {
    const url = 'https://example.com/file.png';
    const expectedData = 'file data content';

    request.get.mockResolvedValue(expectedData);

    const data = await Downloader.downloadFile(url);

    expect(request.get).toHaveBeenCalledWith({ url, encoding: 'binary' });
    expect(data).toEqual(expectedData);
  });

  it('should throw an error when download fails', async () => {
    const url = 'https://example.com/file.png';
    const errorMessage = 'Download failed';

    request.get.mockRejectedValue(new Error(errorMessage));

    try {
      await Downloader.downloadFile(url);
    } catch (err) {
      expect(request.get).toHaveBeenCalledWith({ url, encoding: 'binary' });
      expect(err.message).toContain('Error occured while getting file data');
      expect(err.message).toContain(errorMessage);
    }
  });
});
