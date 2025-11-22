import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Fetching your Profile data....</div>;
  }

  return (
    <div>
      <div>
        Welcome, {user?.firstName} {user?.firstName}
      </div>
      <p>You have {posts?.length} posts</p>
    </div>
  );
}
