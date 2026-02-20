import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const useFileUpload = () => {
  let [fileListMain, setFileListMain] = useState([]);
  let [fileListMainMain, setFileListMainMain] = useState([]);
  const handleBeforeChange = async (file, fileList) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      alwaysKeepResolution: true,
      fileType: "image/webp",
    };
    fileList.map(async (val) => {
      try {
        const imageFile = file;
        const compressedFile = await imageCompression(imageFile, options);
        setFileListMainMain([
          ...fileListMainMain,
          { id: val.uid, blob: compressedFile },
        ]);
      } catch (error) {
        console.log(error);
        return false;
      }
    });
  };
  const handleChangeMain = async ({ fileList, file }) => {
    if (file.status !== "removed") {
      if (file.size / 1028 <= 50000000000000) {
        setFileListMain(fileList);
        // const ids = fileListMainMain.map((val) => val.id);
        // const options = {
        //   maxSizeMB: 0.5,
        //   maxWidthOrHeight: 1920,
        //   useWebWorker: true,
        //   alwaysKeepResolution: true,
        //   fileType: "image/webp",
        // };
        // try {
        //   const imageFile = file.originFileObj;
        //   const compressedFile = await imageCompression(imageFile, options);
        //   console.log(
        //     `🚀 ~ handleChangeMain ~ compressedFile:`,
        //     compressedFile,
        //     "\n",
        //     compressedFile.size / 1024 / 1024,
        //     "mb"
        //   );
        //   setFileListMainMain([
        //     ...fileListMainMain,
        //     { id: file.uid, blob: compressedFile },
        //   ]);
        // } catch (error) {
        //   console.log(error);
        //   return false;
        // }
      } else {
        errorr();
      }
    } else {
      setFileListMain(fileList);
      const main = fileListMainMain.filter((f) => f.id != file.uid);
      setFileListMainMain(main);
    }
  };

  return {
    handleChangeMain,
    handleBeforeChange,
    fileListMain,
    fileListMainMain,
  };
};

export default useFileUpload;
