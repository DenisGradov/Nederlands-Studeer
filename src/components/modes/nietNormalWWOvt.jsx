import {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import ModeModal from "../ui/modeModal.jsx";
import Card from "../ui/card.jsx";
import DropdownSettings from "../ui/dropdownSettings.jsx";
import { getText } from "../../utils/main.js";
import gamingMode from "../../constants/gamingModes.js";

import nietNormalWWOvt, { getRandomVerbByRange, getVerbsCount } from "../../constants/nietNormalWWOvt.js";
import {getFromLocalStorage, saveToLocalStorage} from "../../utils/locale.js";

function NietNormalWWOvt({ handleGoBack, isOnlyNederland, selectedMode }) {
  const fallbackMode = gamingMode.find((m) => m.key === "niet-normal-ww-ovt");
  const usedMode = selectedMode || fallbackMode;

  const [actualWord, setActualWord] = useState({});

  const [isCardOpen, setIsCardOpen] = useState(false);

  const [startRange, setStartRange] = useState(1);
  const [endRange, setEndRange] = useState(getVerbsCount());

  useEffect(() => {
    generateNewWord();
    const startRangeNWWOVT = getFromLocalStorage("startRangeNWWOVT");
    if (startRangeNWWOVT) {
      setStartRange(startRangeNWWOVT);
    } else {
      setStartRange(1);
      saveToLocalStorage("startRangeNWWOVT", 1);
    }
    const endRangeNWWOVT = getFromLocalStorage("endRangeNWWOVT");
    if (endRangeNWWOVT) {
      setEndRange(endRangeNWWOVT);
    } else {
      setEndRange(getVerbsCount());
      saveToLocalStorage("endRangeNWWOVT", getVerbsCount());
    }
  }, []);

  useEffect(() => {
    const startRangeNWWOVT = getFromLocalStorage("startRangeNWWOVT");
    if (startRangeNWWOVT!==startRange) {
      saveToLocalStorage("startRangeNWWOVT", startRange);
    }
  }, [startRange]);

  useEffect(() => {
    const endRangeNWWOVT = getFromLocalStorage("endRangeNWWOVT");
    if (endRangeNWWOVT!==endRange) {
      saveToLocalStorage("endRangeNWWOVT", endRange);
    }
  }, [endRange]);

  const generateNewWord = () => {
    setIsCardOpen(false);

    setTimeout(() => {
      const verb = getRandomVerbByRange(startRange, endRange);
      setActualWord(verb);
    }, 250);
  };

  const handleFlipCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const frontContent = (
    <div className="text-center">
      <span className="text-[#DADADA] text-[40px]">
        {actualWord.infinitive || ""}
      </span>
    </div>
  );

  const backContent = (
    <div className="text-center">
      <p className="text-[#FFFFFF] text-[30px]">
        {actualWord.pastSingular || ""} / {actualWord.pastPlural || ""}
      </p>
      {!isOnlyNederland && (
        <p className="text-[#FFFFFF] text-[20px] opacity-80">
          {actualWord.translation || ""}
        </p>
      )}
    </div>
  );

  return (
    <ModeModal title={usedMode?.title} handleGoBack={handleGoBack}>
      <div className="flex flex-col items-center">
        <div className="mt-[40px] w-full relative" style={{perspective: "1000px"}}>
          <Card
            isFlipped={isCardOpen}
            onClick={handleFlipCard}
            frontContent={frontContent}
            backContent={backContent}
          />
        </div>

        <div className="bg-custom-bg my-6 p-4 w-full flex justify-center rounded-[14px]">
          <span className="text-[#FFFFFF33]">
            {getText("Klik op de kaart om te draaien")}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 ">
          <input
            type="number"
            value={startRange}
            min={1}
            max={getVerbsCount()}
            onChange={(e) => setStartRange(Number(e.target.value))}
            className="bg-[#7244F560] rounded-[8px] py-2 px-4 w-[80px]"
          />
          <button
            onClick={generateNewWord}
            className="bg-[#7244F560] hover:bg-[#7244F520] rounded-[12px] text-[#DADADA] text-[20px] px-4 py-2 hover:scale-[1.03] opacity-95 duration-300 cursor-pointer select-none"
          >
            {getText("Nieuw woord")}
          </button>
          <input
            type="number"
            value={endRange}
            min={1}
            max={getVerbsCount()}
            onChange={(e) => setEndRange(Number(e.target.value))}
            className="bg-[#7244F560] rounded-[8px] py-2 px-4 w-[80px]"
          />
        </div>

        <div className="mt-6">
          <DropdownSettings>
            <div className="w-full">
              <div className="hidden sm:grid w-full text-center gap-2 overflow-x-auto" style={{ gridTemplateColumns: isOnlyNederland ? "repeat(3, 1fr)" : "repeat(4, 1fr)" }}>
                <span className="font-bold text-sm">{getText("Infinitive")}</span>
                <span className="font-bold text-sm">{getText("Past Singular")}</span>
                <span className="font-bold text-sm">{getText("Past Plural")}</span>
                {!isOnlyNederland && <span className="font-bold text-sm">{getText("Translation")}</span>}

                {nietNormalWWOvt.map((item, i) => (
                  <Fragment key={`row-${i}`}>
                    <span className="py-1">{item.infinitive}</span>
                    <span className="py-1">{item.pastSingular}</span>
                    <span className="py-1">{item.pastPlural}</span>
                    {!isOnlyNederland && <span className="py-1">{item.translation}</span>}
                  </Fragment>
                ))}
              </div>

              <div className="sm:hidden flex flex-col gap-2">
                {nietNormalWWOvt.map((item, i) => (
                  <div key={`mobile-row-${i}`} className="p-3 bg-[#7244F520] rounded-lg">
                    <p>{getText("Infinitive")}: {item.infinitive}</p>
                    <p>{getText("Past Singular")}: {item.pastSingular}</p>
                    <p>{getText("Past Plural")}: {item.pastPlural}</p>
                    {!isOnlyNederland && <p>{getText("Translation")}: {item.translation}</p>}
                  </div>
                ))}
              </div>
            </div>
          </DropdownSettings>

        </div>


      </div>
    </ModeModal>
  );
}

NietNormalWWOvt.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  isOnlyNederland: PropTypes.bool.isRequired,
  selectedMode: PropTypes.object
};

export default NietNormalWWOvt;
