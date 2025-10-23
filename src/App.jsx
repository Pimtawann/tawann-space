import "./index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminArticlePage from "./pages/AdminArticlePage";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/article" element={<AdminArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
