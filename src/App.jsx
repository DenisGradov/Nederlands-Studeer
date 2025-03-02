import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import GamesTab from "./components/ui/gamesTab.jsx";
import gamingMode from "./constants/gamingModes.js";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/locale.js";

import Lidwoorden from "./components/modes/lidwoorden.jsx";
import "./App.scss";

function App() {
  const navigate = useNavigate();

  const [selectedMode, setSelectedMode] = useState(null);

  const [isOnlyNederland, setIsOnlyNederland] = useState(true);


  useEffect(() => {
    const storedVal = getFromLocalStorage("isOnlyNederland");
    if (storedVal === null) {
      setIsOnlyNederland(true);
      saveToLocalStorage("isOnlyNederland", "true");
    } else {
      setIsOnlyNederland(storedVal === "true");
    }
  }, []);

  const handleChangeMode = (modeKey) => {
    const found = gamingMode.find((m) => m.key === modeKey);
    if (found) {
      setSelectedMode(found);
      navigate(`/${found.key}`);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleChangeIsOnlyNederland = () => {
    const newVal = !isOnlyNederland;
    setIsOnlyNederland(newVal);
    console.log(newVal)
    saveToLocalStorage("isOnlyNederland", newVal ? "true" : "false");
  };


  const MenuPage = () => {
    return (
      <div className="mt-[50px]">
        {gamingMode.map((m) => (
          <GamesTab
            key={m.key}
            mode={m}
            title={m.title}
            description={m.description}
            handleChangeMode={handleChangeMode}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1521px] m-auto w-full h-full">
      <Header
        isOnlyNederland={isOnlyNederland}
        handleChangeIsOnlyNederland={handleChangeIsOnlyNederland}
      />

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route
          path="/lidwoorden"
          element={
            <Lidwoorden
              selectedMode={selectedMode}
              handleGoBack={handleGoBack}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
