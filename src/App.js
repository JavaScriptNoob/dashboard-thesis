import {BrowserRouter, Route, Routes,} from "react-router-dom";
import './App.css';
import Layout from "./components/layout/layout";
import Home from "./components/home/home";
import DashboardMain from "./components/dashboard-main/dashboard-main";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="dashboard" element={<DashboardMain />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for.
          <Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
