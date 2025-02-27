import axios from "axios";

export const fetchFullName = async () => {
  try {
    const response = await axios.get("/api/fetchFullName");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
