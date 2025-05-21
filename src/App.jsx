import Home from "./Pages/Home";
import ListTodos from "./Pages/ListTodos";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listtodos" element={<ListTodos />} />
      </Routes>
    </div>
  );
}

export default App;
