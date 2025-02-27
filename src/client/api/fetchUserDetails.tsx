import axios from "axios";

export const fetchUserDetails = async () => {
    try {
        const response = await axios.get("/api/fetchUserDetails");
        return response.data;
    } catch (e) {
        console.error(e);
    }
};
