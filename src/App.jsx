import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { RoutesPrivate } from "./routes/routes.private";
import { RoutesPublic } from "./routes/routes.public";

function App() {
  const { isAuthenticated, login, logout } = useAuthStore();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      login();
      return
    }
    logout()
    return () => {};
  }, []);

  return <>{isAuthenticated ? <RoutesPrivate /> : <RoutesPublic />}</>;
}

export default App;
