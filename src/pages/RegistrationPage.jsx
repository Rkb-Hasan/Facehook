import { Link } from "react-router-dom";
import registrationIcon from "../assets/icons/registration.svg";
import RegistrationForm from "../components/auth/RegistrationForm";

export default function RegistrationPage() {
  return (
    <main className="lg:px-12 md:px-10 flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div class="container grid items-center gap-8 lg:grid-cols-2">
        <div>
          <img
            class="mb-12 h-60"
            src={registrationIcon}
            alt="auth_illustration"
          />
          <div>
            <h1 class="mb-3 text-4xl font-bold lg:text-[40px]">Facehook</h1>
            <p class="max-w-[452px] text-gray-400/95 lg:text-lg">
              Create a social media app with features like, showing the post,
              post details, reactions, comments and profile.
            </p>
          </div>
        </div>

        <div class="card">
          <RegistrationForm />

          <div className="py-4 lg:py-4">
            <p class="text-center text-xs text-gray-600/95 lg:text-sm">
              Already have an account?
              <Link
                class="hover:text-lwsGreen text-white transition-all hover:underline"
                to="/login"
              >
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
