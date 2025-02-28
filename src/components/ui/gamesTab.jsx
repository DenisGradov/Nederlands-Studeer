import PropTypes from "prop-types";
import {getText} from "../../utils/main.js";

function GamesTab({title, description, mode, handleChangeMode}) {
  return (
    <div onClick={()=>handleChangeMode(mode.key)} className="m-[10px] p-[22px] flex justify-between items-center bg-custom-bg rounded-[16px] hover:bg-[#7244F510] duration-300 cursor-pointer">
      <div className="flex flex-col">
        <span className="text-[20px] font-medium text-[#fff]">{getText(title)}</span>
        <span className="text-[20px] font-normal text-[#525661]">{getText(description)}</span>
      </div>

      <span className="text-[#525661] py-[12px] px-[20px] rounded-full bg-[#FFFFFF05] group-hover:scale-105 opacity-95 duration-300 cursor-pointer group-hover:text-[#7244F5] group-hover:bg-[#7244F510]">{getText("Start")}</span>
    </div>
  );
}
GamesTab.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  handleChangeMode: PropTypes.func.isRequired,
};

export default GamesTab;