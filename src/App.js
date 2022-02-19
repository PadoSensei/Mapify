import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="help" element={<HelpPage />}/>
        <Route path="profile" element={<ProfilePage />}/>
      </Routes>
    </>
  );
}

export default App;
