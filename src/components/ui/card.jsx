import PropTypes from "prop-types";

function Card({ isFlipped, onClick, frontContent, backContent }) {
  return (
    <div
      onClick={onClick}
      className="transition-transform duration-700 transform cursor-pointer"
      style={{
        transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      <div
        className="bg-gradient-card py-[80px] w-full rounded-[12px] flex justify-center flex-col items-center text-center"
        style={{ backfaceVisibility: "hidden" }}
      >
        {frontContent}
      </div>

      <div
        className="bg-custom-bg mt-[14px] py-[80px] w-full flex justify-center rounded-[12px] absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateX(180deg)",
        }}
      >
        {backContent}
      </div>
    </div>
  );
}

Card.propTypes = {
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
};

export default Card;
