import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/HomePage";
import {Request} from "./pages/RequestPage"

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />}/>
          <Route path='/request' element={<Request />}/>
      </Routes>
  );
}

export default App;
