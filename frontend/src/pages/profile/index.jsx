import { getUser } from "../../Utils/Common";
import { useParams } from "react-router-dom";
import Private from "./private";
import Public from "./public";

export default function Profile() {
  const { username } = useParams();
  if (getUser().username === username) {
    return <Private />;
  } else {
    return <Public />;
  }
}
