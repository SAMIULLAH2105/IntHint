import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Collection from "./Pages/Collection";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import UploadCollection from "./Pages/UploadCollection";
import ViewOwnCollection from "./Pages/ViewOwnCollection";

function App() {
  return (
    <>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Signup />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/user/addCollection" element={<UploadCollection />} />
            <Route
              path="/user/viewCollection"
              element={<ViewOwnCollection />}
            />
          </Routes>
        </Router>
      </StoreProvider>
    </>
  );
}

export default App;
