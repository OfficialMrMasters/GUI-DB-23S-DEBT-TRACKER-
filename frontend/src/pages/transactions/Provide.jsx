import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usersAPI from "../../api/usersApi";
import transactionsAPI from "../../api/transactionsApi";

function Provide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [friend, setFriend] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    usersAPI
      .getUser({ username: state.friend_username })
      .then(function (response) {
        setFriend(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    transactionsAPI
      .getTransactions({
        user1_id: state.user_id,
        user2_id: state.friend_id,
      })
      .then(function (response) {
        setTransactions(response.data);
      });
  }, [state]);

  function handleBorrow(e) {
    e.preventDefault();
    transactionsAPI.newTransaction({
      user1_id: state.user_id,
      user2_id: state.friend_id,
      amount: amount,
    });
    navigate(0);
  }

  function handlePayment(transaction_id) {
    transactionsAPI.payTransaction({ transaction_id: transaction_id });
    navigate(0);
  }

  return (
    <div className="container">
      <div className="row col-single">
        <div className="column col-full">
          <div>
            <h2>Provide to: {friend.first_name}</h2>
          </div>
          <div>
            <span>
              <h3>
                Amount to provide:{" $"}
                {transactions.length === 0
                  ? "0"
                  : transactions.reduce((accum, transaction) => {
                      return accum + transaction.amount;
                    }, 0)}
              </h3>
            </span>
          </div>
          <div>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label htmlFor="amount">Provide: $</label>
                <input
                  placeholder="0"
                  name="amount"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <button
                className="button-red"
                type="button"
                style={{ width: "fit-content" }}
                onClick={handleBorrow}
              >
                Provide
              </button>
            </form>
          </div>
          <div>
            <h3>Existing transactions:</h3>
            <div style={{ display: "flex", textAlign: "right" }}>
              <span style={{ width: "25%" }}>
                <span style={{ padding: "1em" }}>Transaction ID:</span>
              </span>
              <span style={{ width: "25%" }}>
                <span style={{ padding: "1em" }}>Date:</span>
              </span>
              <span style={{ width: "25%" }}>
                <span style={{ padding: "1em" }}>Amount:</span>
              </span>
              <span style={{ width: "25%" }}>
                <span style={{ padding: "1em" }}>Forgive:</span>
              </span>
            </div>
          </div>
          <div>
            {transactions.map((transaction) => {
              return (
                <div
                  style={{
                    display: "flex",
                    textAlign: "right",
                    alignItems: "center",
                  }}
                  key={transaction.transaction_id}
                >
                  <span style={{ width: "25%" }}>
                    <span style={{ padding: "1em" }}>
                      {transaction.transaction_id}
                    </span>
                  </span>
                  <span style={{ width: "25%" }}>
                    <span style={{ padding: "1em" }}>
                      {transaction.date.slice(0, 10)}
                    </span>
                  </span>
                  <span style={{ width: "25%" }}>
                    <span style={{ padding: "1em" }}>
                      ${transaction.amount}
                    </span>
                  </span>
                  <span style={{ width: "25%" }}>
                    <span style={{ padding: "1em" }}>
                      <button
                        className="button-red"
                        type="button"
                        onClick={() =>
                          handlePayment(transaction.transaction_id)
                        }
                      >
                        Forgive
                      </button>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Provide;
