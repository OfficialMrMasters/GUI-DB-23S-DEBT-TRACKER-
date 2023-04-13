import { useParams } from "react-router-dom";
import usersAPI from "../../api/usersApi";
import { useEffect, useState } from "react";

export default function Public() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});

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
          <div className="name">
            <span>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
          </div>
          <div className="wrapper">
            <div className="username">
              <span className="title">Username: </span>
              <span>{userInfo.username}</span>
            </div>
            <div className="friends">
              <span className="title">Friends: </span>
              <ul>
                <li>You have no friends {":("}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
