import PropTypes from "prop-types";
import {getText} from "../../utils/main.js";

function ModeModal({title, handleGoBack, children}) {
  return (
    <div className="bg-custom-bg rounded-[20px] w-full mt-[10px] p-[40px]">
      <div className="flex justify-between w-full">
        <span className="text-[#DADADA] text-[24px] font-medium">{getText(title)}</span>
        <div onClick={() => handleGoBack()} className="flex items-center hover:scale-105 opacity-95 duration-300  cursor-pointer select-none">
          <img src="icons/back.svg" className="w-[24px] mr-[6px]" alt="back"/>
          <span className="text-[#7244F5]">{getText("Ga terug")}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

ModeModal.propTypes = {
  title: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
export default ModeModal;