import axios from "axios";

export const fetchFullName = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/fetchFullName");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
