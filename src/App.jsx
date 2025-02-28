import Header from "./components/Header.jsx";
import GamesTab from "./components/ui/gamesTab.jsx";
import gamingMode from "./constants/gamingModes.js";
import { useEffect, useState } from "react";
import ModeModal from "./components/ui/modeModal.jsx";
import { lidwoordenLijst, getRandomLidWord } from "./constants/lidwoorden.js";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/locale.js";
import {
  getLidwoordenRules,
  getText,
  updateLidwoordenRules
} from "./utils/main.js";
import DropdownSettings from "./components/ui/dropdownSettings.jsx";
import "./App.scss";

function App() {
  const [mode, setMode] = useState("Menu");
  const [selectedMode, setSelectedMode] = useState(null);
  const [actualWord, setActualWord] = useState({});
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [usedButton, setUsedButton] = useState("");
  const [isOnlyNederland, setIsOnlyNederland] = useState("");
  const [userLidWoordenRules, setUserLidWoordenRules] = useState({});

  useEffect(() => {
    if (mode === "lidwoorden") {
      const newWord = getRandomLidWord(userLidWoordenRules);
      setActualWord(newWord);
    }
  }, [mode, userLidWoordenRules]);

  useEffect(() => {
    const newIsOnlyNederland = getFromLocalStorage("isOnlyNederland");
    if (newIsOnlyNederland===null) {
      setIsOnlyNederland(true)
      saveToLocalStorage("isOnlyNederland", true);
    } else {
      setIsOnlyNederland(newIsOnlyNederland)

    }
    const lidWoordenRules = getFromLocalStorage("lidWoordenRules");
    if (lidWoordenRules) {
      setUserLidWoordenRules(lidWoordenRules);
    } else {
      const newUserLidWoordenRules = getLidwoordenRules(lidwoordenLijst);
      setUserLidWoordenRules(newUserLidWoordenRules);
      saveToLocalStorage("lidWoordenRules", newUserLidWoordenRules);
    }
  }, []);

  const handleChangeMode = (modeKey) => {
    const found = gamingMode.find((m) => m.key === modeKey);
    if (found) {
      setMode(found.key);
      setSelectedMode(found);
    }
  };

  const handleGoBack = () => {
    setMode("Menu");
  };

  const handleChangeShowCard = (button) => {
    if (!isCardOpen) {
      setUsedButton(button);
    }
    setIsCardOpen(!isCardOpen);
  };

  const handleNewCard = () => {
    setIsCardOpen(false);
    setTimeout(() => {
      if (mode === "lidwoorden") {
        const newWord = getRandomLidWord(userLidWoordenRules);
        setActualWord(newWord);
        setUsedButton("");
      }
    }, 200);
  };

  const handleChangeIsOnlyNederland = () => {
    const newVal = !isOnlyNederland;
    setIsOnlyNederland(newVal);
    saveToLocalStorage("isOnlyNederland", newVal);
  };

  const checkIfAllAreTrue = (rules) => {
    for (const article in rules) {
      for (const rule in rules[article]) {
        if (!rules[article][rule]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleToggleAllRules = (checked) => {
    const updated = updateLidwoordenRules({ ...userLidWoordenRules }, true, checked);
    setUserLidWoordenRules(updated);
    saveToLocalStorage("lidWoordenRules", updated);
  };

  const handleToggleRule = (ruleName, newVal) => {
    const updated = updateLidwoordenRules({ ...userLidWoordenRules }, ruleName, newVal);
    setUserLidWoordenRules(updated);
    saveToLocalStorage("lidWoordenRules", updated);
  };

  return (
    <div className="max-w-[1521px] m-auto w-full h-full">
      <Header
        isOnlyNederland={isOnlyNederland}
        handleChangeIsOnlyNederland={handleChangeIsOnlyNederland}
      />
      {mode === "Menu" ? (
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
      ) : (
        <ModeModal title={selectedMode.title} handleGoBack={handleGoBack}>
          {mode === "lidwoorden" && (
            <div className="flex flex-col">
              <div className="mt-[40px] w-full relative" style={{ perspective: "1000px" }}>
                <div
                  onClick={() => handleChangeShowCard("")}
                  className="transition-transform duration-700 transform cursor-pointer"
                  style={{
                    transform: isCardOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                    transformStyle: "preserve-3d",
                    position: "relative",
                  }}
                >
                  <div
                    className="bg-gradient-card py-[80px] w-full rounded-[12px] flex justify-center flex-col items-center text-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {!isOnlyNederland && <span className="text-[#DADADA] text-[40px]">{getText(actualWord.woord)}</span>}
                    <span className="text-[#DADADA] text-[40px]">{actualWord.woord}</span>
                  </div>
                  <div
                    className="bg-custom-bg mt-[14px] py-[80px] w-full flex justify-center rounded-[12px] absolute inset-0"
                    style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                  >
                    <div className="text-center">
                      <p
                        className={`${
                          usedButton === ""
                            ? "text-[#FFFFFF]"
                            : usedButton === actualWord.lidwoord
                              ? "text-green-500"
                              : "text-red-500"
                        } text-[30px]`}
                      >
                        {actualWord.lidwoord} {actualWord.woord}
                      </p>
                      <p
                        className={`${
                          usedButton === ""
                            ? "text-[#FFFFFF]"
                            : usedButton === actualWord.lidwoord
                              ? "text-green-500"
                              : "text-red-500"
                        } text-[20px] opacity-80`}
                      >
                        {getText(actualWord.waarom)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-custom-bg my-6 p-4 w-full flex justify-center rounded-[14px]">
                <span className="text-[#FFFFFF33]">
                  {getText("Probeer het artikel voor het woord te raden door op de of het te klikken")}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <div
                  onClick={() => handleChangeShowCard("de")}
                  className="flex items-center justify-center w-full bg-[#7244F560] hover:bg-[#7244F520] m-2 rounded-[12px] text-[#DADADA] text-[30px] py-[40px] hover:scale-[1.03] opacity-95 duration-300 cursor-pointer select-none"
                >
                  De
                </div>
                <div
                  onClick={handleNewCard}
                  className="text-center flex items-center justify-center sm:px-[50px] px-[5px] bg-[#7244F560] hover:bg-[#7244F520] m-2 rounded-[12px] text-[#DADADA] text-[30px] py-[40px] hover:scale-[1.03] opacity-95 duration-300 cursor-pointer select-none"
                >
                  {getText("Nieuw woord")}
                </div>
                <div
                  onClick={() => handleChangeShowCard("het")}
                  className="flex items-center justify-center w-full bg-[#7244F560] hover:bg-[#7244F520] m-2 rounded-[12px] text-[#DADADA] text-[30px] py-[40px] hover:scale-[1.03] opacity-95 duration-300 cursor-pointer select-none"
                >
                  Het
                </div>
              </div>
              <div className="bg-custom-bg p-4 rounded-[12px] sm:maxh-[500px] max-h-[300px] overflow-auto">
                <div className="flex items-center mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkIfAllAreTrue(userLidWoordenRules)}
                      onChange={(e) => handleToggleAllRules(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-lg">{getText("Alles")}</span>
                  </label>
                </div>
                {Object.entries(userLidWoordenRules).map(([article, rules]) => (
                  <div key={article} className="mb-6">
                    <h3 className="font-bold text-xl text-center mb-2">{article}</h3>
                    <div className="flex justify-center flex-wrap">
                      {Object.entries(rules).map(([ruleName, ruleValue]) => (
                        <label
                          key={ruleName}
                          className="flex items-center mb-2 mr-6 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={ruleValue}
                            onChange={() => handleToggleRule(ruleName, !ruleValue)}
                            className="mr-2"
                          />
                          <span className="text-lg">{getText(ruleName)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <DropdownSettings>
                  {getText(selectedMode.rules)}
                </DropdownSettings>
              </div>
            </div>
          )}
        </ModeModal>
      )}
    </div>
  );
}

export default App;
