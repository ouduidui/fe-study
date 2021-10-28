/**
 * 将blob转换为二进制
 * @param {Blob} blob 
 * @return {string}
 */
const blobToString = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(
        reader.result
          .split("")
          .map((v) => v.charCodeAt())
          .map((v) => v.toString(16).toUpperCase())
          .map(v => v.padStart(2, '0'))
          .join(" ")
      );
    };

    reader.readAsBinaryString(blob);
  });
};

/**
 * 判断是否为GIF
 * @desc GIF文件二进制开头为 47 49 46 38 37 61 或 47 49 46 38 39 61
 * @param {File} file
 * @return {Promise<boolean>}
 */
const isGif = async (file) => {
  return ["47 49 46 38 37 61", "47 49 46 38 39 61"].includes(
    await blobToString(file.slice(0, 6))
  );
};

/**
 * 判断是否为PNG
 * @desc PNG文件二进制开头为 89 50 4E 47 0D 0A 1A 0A
 * @param {File} file
 * @return {Promise<boolean>}
 */
const isPng = async (file) => {
  return (await blobToString(file.slice(0, 8))) === "89 50 4E 47 0D 0A 1A 0A";
};

/**
 * 判断是否为JPG
 * @desc JPG文件二进制开头为 FF D8，结尾为FF D9
 * @param {File} file
 * @return {Promise<boolean>}
 */
const isJpg = async (file) => {
  const len = file.size;
  const start = await blobToString(file.slice(0, 2));
  const tail = await blobToString(file.slice(-2, len));
  return start === "FF D8" && tail === "FF D9";
};

/**
 * 判断是否为图片
 * @param {File} file 
 * @return {Promise<boolean>}
 */
const checkIsImage = async (file) => {
  return (await isJpg(file)) || (await isPng(file)) || (await isGif(file));
};

export default checkIsImage;
