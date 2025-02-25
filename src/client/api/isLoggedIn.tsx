import axios from "axios";

export const isLoggedIn = async () => {

    const response = await axios.get("http://localhost:3000/api/isLoggedIn");
    if (response && response.data) {
      return response.data;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
};
