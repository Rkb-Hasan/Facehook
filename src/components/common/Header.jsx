import { Link } from "react-router-dom";
import home from "../../assets/icons/home.svg";
import notification from "../../assets/icons/notification.svg";
import avatar from "../../assets/images/avatars/avatar_1.png";
import logo from "../../assets/images/logo.svg";
import Logout from "../auth/Logout";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={notification} alt="Notification" />
          </button>

          <Logout />

          <button className="flex-center ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Sumit</span>
            <img
              className="max-h-8 max-w-8 lg:max-h-11 lg:max-w-11"
              src={avatar}
              alt="avatar"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
