import "./index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/post/:postId" element={<ViewPostPage />}/>
        </Routes>  
    </div>
  );
}

export default App;
