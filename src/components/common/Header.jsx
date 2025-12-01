import { Link } from "react-router-dom";
import home from "../../assets/icons/home.svg";
import logo from "../../assets/icons/logo.svg";
import notification from "../../assets/icons/notification.svg";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Logout from "../auth/Logout";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  // state populates only after the visit of profile page.
  const user = state?.user ?? auth?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-1">
      <div className="container flex  items-center justify-between ">
        <Link to="/">
          <img
            className="max-w-[30px] md:max-w-10 lg:max-w-[60px] rounded-full "
            src={logo}
          />
        </Link>

        <div className=" flex items-center justify-center gap-5 sm:gap-10 grow">
          <Link to="/" className="btn-primary ">
            <img className="w-[18px] md:w-6 lg:w-8" src={home} alt="Home" />
          </Link>
          <button className="icon-btn ">
            <img
              className="w-[18px] md:w-6 lg:w-8 "
              src={notification}
              alt="Notification"
            />
          </button>

          <Logout />
        </div>

        <Link to="/me">
          <button className="flex-center  gap-2">
            <span className="text-[10px] sm:text-base font-medium md:text-lg lg:text-xl  ">
              {user?.firstName} {user?.lastName}
            </span>
            <img
              className="h-8 w-8 md:h-12 md:w-12 lg:h-15 lg:w-15 rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
          </button>
        </Link>
      </div>
    </nav>
  );
}
