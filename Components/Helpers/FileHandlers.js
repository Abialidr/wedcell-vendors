import axios from "axios";
import { PROXY } from "../../config";

export const ImageDelete = async (keySource) => {
  // const [data, setData] = useState(null);
  const key = keySource
    .replaceAll("25%", "%")
    .replaceAll("https://wedcell-s3-1.s3.ap-south-1.amazonaws.com/", "")
    .replaceAll("+", " ");


  axios
    .post(`${PROXY}/awsS3/deleteImage`, {
      fileName: key,
    })
    .then((res) => {
      let message = res.data.message;
      // setData(message);
    })
    .catch((err) => {
      // setData(err.message);
    });

  // return data;
};
