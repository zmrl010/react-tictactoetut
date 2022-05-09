export default function Square(props) {
  return (
    <button
      className={"square " + (props.isWinner ? "winner" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
