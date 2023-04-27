import { useEffect, useState } from "react";
import { friendsAPI } from "../../api";
import { getUser } from "../../Utils/Common";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    friendsAPI.getFriend({ user_id: getUser().user_id }).then((res) => {
      setFriends(res.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="column" style={{ padding: 0, paddingTop: "1em" }}>
          <div className="title">
            <h3>Friends</h3>
          </div>
          <div className="content">
            <ul>
              {friends.map((friend) => {
                return (
                  <li key={friend.user_id}>
                    <div className="friend-wrapper">
                      <div className="img-wrapper">
                        <img
                          src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                          alt="friend"
                        />
                      </div>
                      <div className="info">
                        <div className="name">
                          {friend.first_name + " " + friend.last_name}
                        </div>
                        <div className="flex">
                          <div className="borrow-owe">
                            Borrowed:{" "}
                            <span className="amount">
                              ${friend.amount_owed}
                            </span>
                          </div>
                          <div className="borrow-owe">
                            Owed:{" "}
                            <span className="amount">
                              ${friend.amount_borrowed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="buttons-wrapper">
                        <button
                          className="button"
                          onClick={() => {
                            navigate("/borrow", {
                              state: {
                                user_id: getUser().user_id,
                                friend_id: friend.user_id,
                                friend_username: friend.username,
                              },
                            });
                          }}
                        >
                          Borrow
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            navigate("/provide", {
                              state: {
                                user_id: friend.user_id,
                                friend_id: getUser().user_id,
                                friend_username: friend.username,
                              },
                            });
                          }}
                        >
                          Provide
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
