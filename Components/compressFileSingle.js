import imageCompression from "browser-image-compression";

const compressFileSingle = async (file, formData, fieldName) => {
  console.log("🚀 ~ compressFileSingle ~ file:", file);
  if (file) {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      alwaysKeepResolution: false,
      fileType: "image/png",
    };
    try {
      let compressedFile = await imageCompression(file, options);
      compressedFile = new File([compressedFile], compressedFile.name);
      return compressedFile;
    } catch (error) {
      console.error(error);
    }
  }
};

export default compressFileSingle;
