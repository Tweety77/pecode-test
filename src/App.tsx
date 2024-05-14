import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './Components/Layout';
import Characters from './Components/Characters';
import Episodes from "./Components/Episodes";
import Locations from "./Components/Locations";

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Episodes />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/locations" element={<Locations />} />
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;