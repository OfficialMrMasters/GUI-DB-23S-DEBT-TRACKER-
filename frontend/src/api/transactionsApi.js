import { axios, url } from "./axios";

const newTransaction = ({ user1_id, user2_id, amount }) => {
  console.log(user1_id, user2_id, amount);
  return axios.post(url + `/transaction`, {
    sender_id: user1_id,
    receiver_id: user2_id,
    amount: amount,
  });
};

const getTransactions = ({ user1_id, user2_id }) => {
  return axios.get(url + `/user/${user1_id}/transactions/${user2_id}`);
};

const payTransaction = ({ transaction_id }) => {
  axios.delete(url + `/transaction/${transaction_id}`);
};

const transactionsAPI = {
  newTransaction,
  getTransactions,
  payTransaction,
};

export default transactionsAPI;
