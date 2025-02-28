import socialMedia from "../constants/social.js";
import PropTypes from "prop-types";
import {getText} from "../utils/main.js";

function Header({isOnlyNederland, handleChangeIsOnlyNederland}) {
  return (
    <div className="flex justify-between m-[5px] mt-[10px] sm:mt-[25px] border-b border-border-custom text-selection pb-[19px]">
      <a href={socialMedia.find((item)=> item.name === "GitHub").url} target="_blank" className="hover:scale-105 opacity-95 duration-300  cursor-pointer select-none">
        <img src="logo.png" className="w-[60px]" alt="Denys"/>
      </a>
      <div className="flex items-center">
          <span onClick={handleChangeIsOnlyNederland} className={`${!isOnlyNederland?"text-[#ffffff]":"text-selection"} select-none mr-[20px] hover:scale-105 opacity-95 duration-300  cursor-pointer`}>{getText("Oekraïens")}</span>
        {socialMedia.map((item, index) => (
          item['icon'] && (
            <a href={item.url} className="mx-[5px] flex items-center hover:scale-105 opacity-95 duration-300  cursor-pointer" target="_blank" key={index}>
              <img src={item.icon} alt={item.name}/>

            </a>
          )
        ))}
      </div>
    </div>
  );
}
Header.propTypes = {
  isOnlyNederland: PropTypes.bool.isRequired,
  handleChangeIsOnlyNederland: PropTypes.func.isRequired,
}
export default Header;