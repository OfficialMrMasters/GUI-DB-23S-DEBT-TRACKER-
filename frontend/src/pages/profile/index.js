import { useParams } from "react-router";
import users from "../../axios/users.js";

export default function Profile() {
  const { username } = useParams();
  const userInfo = users.find((user) => user.username === username);

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div className="img-wrapper">
            <img
              src={userInfo.profilePicture.imgUrl}
              alt={`${userInfo.firstName}'s profile`}
            />
          </div>
          <div className="name">
            <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
          </div>
          <div className="username">
            <span>Username: {userInfo.username}</span>
          </div>
          <div className="friends">
            <span>Friends: None, implement this</span>
          </div>
        </div>
        <div className="column">
          <div className="title">
            <h3>Settings</h3>
          </div>
          <div className="options">
            <span>None atm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
