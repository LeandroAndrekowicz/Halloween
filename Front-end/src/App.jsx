import './App.css'
import Content from "./components/Content";
import SearchTicket from "./components/SearchTicket";
import Home from './components/Home'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/ticket" element={<SearchTicket />} />
          <Route path='/buyTicket' element={<Content />} />
          <Route path='*' element={<NotFound />} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Routes>
    </Router>
  );
}

export default App;