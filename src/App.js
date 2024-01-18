import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebars from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <div className="w-1/1 text-white">
          <Sidebars />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
