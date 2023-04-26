import { axios, url } from "./axios";

const getFriend = ({ user_id }) => {
  return axios.post(url + "/friends", {
    user_id: user_id,
  });
};

const friendsApi = {
  getFriend,
};

export default friendsApi;
