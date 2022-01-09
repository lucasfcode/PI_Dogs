import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Entry from "./components/Entry";
import CreateDog from "./components/CreateDog";
import { getAllDogs, getTemperaments } from "./redux/actions";
import React from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getAllDogs(dispatch);
    getTemperaments(dispatch);
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/create/" element={<CreateDog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
