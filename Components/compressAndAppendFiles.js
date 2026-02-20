import imageCompression from 'browser-image-compression';

const compressAndAppendFiles = async (files, formData, fieldName, from) => {
  if (files) {
    await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.5,
          useWebWorker: true,
          alwaysKeepResolution: false,
          // fileType: "image/webp",
        };
        if (file?.type == 'application/pdf') {
          formData.append(fieldName, file.originFileObj);
        } else {
          try {
            let compressedFile = await imageCompression(
              file.originFileObj,
              options
            );
            compressedFile = new File([compressedFile], compressedFile.name);
            formData.append(fieldName, compressedFile);
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
  }
};

export default compressAndAppendFiles;
