import { axiosReq } from "../api/axiosDefaults";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";

export const useSignOut = () => {
  const setCurrentUser = useSetCurrentUser();

  const signOut = async () => {
    try {
      // Get CSRF token from cookie
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      await axiosReq.post(
        "dj-rest-auth/logout/",
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken || "", // Send CSRF token
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      // Remove user from context
      setCurrentUser(null);

      // Optional: force reload to clear cached auth state
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return signOut;
};