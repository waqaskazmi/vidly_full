import axios from "axios";
import logger from "./loggingService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.baseURL = "https://vidly-be-waqaskazmi.vercel.app/api";
axios.defaults.baseURL = "https://vidly-full.vercel.app/api";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if(!expectedError){
    logger.log(error);
    toast.error("An Unexpected Error has occurred");
  }
  return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete,
    setJwt
}
