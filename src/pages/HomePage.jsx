import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <p>HomePage</p>
      <Link to="/me">Profile Page</Link>
    </div>
  );
}
