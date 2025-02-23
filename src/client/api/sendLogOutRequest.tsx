import axios from "axios";

export const sendLogOutRequest = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/logOut");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
