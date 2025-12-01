import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="icon-btn ">
      <img className="w-[18px] md:w-6 lg:w-8" src={logout} alt="Logout" />
    </button>
  );
}
