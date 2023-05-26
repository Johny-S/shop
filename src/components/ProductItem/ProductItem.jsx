import { Button } from "../Button/Button";
import "./ProductItem.css";

export const ProductItem = ({ product, className, onAdd, isSent }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={"product " + className}>
      <div className="img"></div>
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">
        <span>{product.price}</span>
      </div>
      <Button className="add-btn" onClick={onAddHandler}>
        Добавить в корзину
      </Button>
      {isSent && "Отправлено"}
    </div>
  );
};
