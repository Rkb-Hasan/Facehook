import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
import EditProvider from "../providers/EditProvider";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <EditProvider>
                <Header />
                <main className="mx-auto max-w-[1020px] py-8">
                  <div className="container">
                    <Outlet />
                  </div>
                </main>
              </EditProvider>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
