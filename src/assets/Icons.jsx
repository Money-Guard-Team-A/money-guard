import Icons from "./sprite.svg";

const Icon = ({ id, className, style }) => {
  return (
    <svg className={className} style={style}>
      <use href={Icons + id} />
    </svg>
  );
};
export default Icon;
