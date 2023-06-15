import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./pages";
import ManageList from "./pages/ManageList";
import SearchPage from "./pages/Search";
import ErrorPage from "./pages/ErrorPage";
import MusicPlayerBar from "./components/MusicPlayerBar/MusicPlayerBar";
import ContextIndex from "./contexts";

function App() {
  return (
    <div className="App">
      <ContextIndex>
        <header className="">
          <NavigationBar />
        </header>
        <div className="h-screen">
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/manage-music" element={<ManageList />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
        <div className="sticky bottom-0">
          <MusicPlayerBar></MusicPlayerBar>
        </div>
      </ContextIndex>
    </div>
  );
}

export default App;
