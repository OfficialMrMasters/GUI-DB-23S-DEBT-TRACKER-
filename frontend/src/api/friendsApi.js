import { axios, url } from "./axios";

const getFriend = ({ user_id }) => {
  return axios.get(url + `/friends/${user_id}`);
};

const removeFriend = ({ friend_id }) => {
  axios.delete(url + `/friend/${friend_id}`);
};

const addFriend = ({ user1_id, user2_id }) => {
  axios.post(url + `/friend`, {
    user1_id: user1_id,
    user2_id: user2_id,
  });
};

const friendsApi = {
  getFriend,
  removeFriend,
  addFriend,
};

export default friendsApi;
