import "./index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/post/:postId" element={<ViewPostPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>  
    </div>
  );
}

export default App;
