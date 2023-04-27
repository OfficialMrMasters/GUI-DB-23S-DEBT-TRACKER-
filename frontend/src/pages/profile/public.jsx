import { useNavigate, useParams } from "react-router-dom";
import usersAPI from "../../api/usersApi";
import { useEffect, useState } from "react";
import { friendsAPI } from "../../api";
import { getUser } from "../../Utils/Common";

export default function Public() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [friends, setFriends] = useState([]);
  const [areFriends, setAreFriends] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    usersAPI
      .getUser({ username })
      .then(function (response) {
        setUserInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username]);

  useEffect(() => {
    if (Object.entries(userInfo).length > 0) {
      friendsAPI.getFriend({ user_id: userInfo.user_id }).then((res) => {
        setFriends(res.data);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (friends.length > 0) {
      setAreFriends(
        friends.some((friend) => friend.user_id === getUser().user_id)
      );
    }
  }, [friends]);

  return (
    <div className="container">
      <div className="row col-single">
        <div className="column col-full">
          <div className="img-wrapper profile-img">
            <img
              src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
              alt="profile"
            />
          </div>
          <div
            className="name"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
            {!areFriends ? (
              <button
                className="button-red"
                style={{ width: "fit-content" }}
                onClick={() => {
                  friendsAPI.addFriend({
                    user1_id: getUser().user_id,
                    user2_id: userInfo.user_id,
                  });
                  navigate(0);
                }}
              >
                Add Friend
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="wrapper">
            <div className="username">
              <span className="title">Username: </span>
              <span>{userInfo.username}</span>
            </div>
            <div className="friends">
              <span className="title">Friends: </span>
              {userInfo.setPrivate ? (
                <div>Account is private</div>
              ) : (
                <ul>
                  {friends.map((friend) => {
                    return (
                      <li
                        key={friend.user_id}
                        style={{
                          listStyleType: "none",
                          padding: "1em",
                          display: "flex",
                        }}
                      >
                        <div style={{ width: "100px", padding: "1em" }}>
                          <img
                            src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                            alt="friend"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>
                            {friend.first_name + " " + friend.last_name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
