function Card({ item, openCards, clearCards, index }) {
  return (
    <div className={openCards.includes(index) ? null : "hidden"}>{item}</div>
  );
}
export default Card;
