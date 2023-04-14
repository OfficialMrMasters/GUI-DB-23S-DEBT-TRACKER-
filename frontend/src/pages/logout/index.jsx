import { removeUserSession } from "../../Utils/Common";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    removeUserSession();
    navigate("/");
  }, [navigate]);
}
