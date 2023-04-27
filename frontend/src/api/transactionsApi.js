import { axios, url } from "./axios";

const newTransaction = ({ user1_id, user2_id, amount }) => {
  return axios.post(url + `/transaction/`, {
    sender_id: user1_id,
    receiver_id: user2_id,
    amount: amount,
  });
};

const transactionsAPI = {
  newTransaction,
};

export default transactionsAPI;
