import axios from "axios";
interface loginType {
  email: string;
  password: string;
}
export const sendLoginRequest = async ({ email, password }: loginType) => {
  try {
    const response = await axios.post("/api/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
