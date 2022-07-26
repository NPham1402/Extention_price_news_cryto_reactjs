import "./App.css";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Allcoin from "./Page/Main";
import Likecoin from "./Page/Detail";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies();
  const set = () => {
    if (cookies.id_coins === undefined) {
      setCookie("id_coins", { data: [] });
    }
  };
  return (
    <>
      {set()}
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Allcoin />} />
          <Route path="/detail" element={<Likecoin />} />
        </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
