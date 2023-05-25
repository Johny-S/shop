import { useState, useEffect, useMemo } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { ProductItem } from "../ProductItem/ProductItem";
import "./ProductList.css";

const products = [
  { id: 1, title: "	Быки и коровы	", price: 2000, description: "	Однажды	" },
  { id: 2, title: "	Тетрис	", price: 5000, description: "	в	" },
  { id: 3, title: "	Шашки	", price: 8520, description: "	студеную	" },
  { id: 4, title: "	Шахматы	", price: 6478, description: "	зимнюю	" },
  { id: 5, title: "	Джанга	", price: 859, description: "	пору	" },
  { id: 6, title: "	Счетовод	", price: 522, description: "	я 	" },
  { id: 7, title: "	Ну погоди!	", price: 698, description: "	из	" },
  { id: 8, title: "	Нарды	", price: 654, description: "	лесу	" },
  { id: 9, title: "	Секс	", price: 1111, description: "	вышел	" },
  { id: 10, title: "	Рок & ролл	", price: 9879, description: "	и	" },
];

export const ProductList = () => {
  const { tg } = useTelegram();
  const [basket, setBasket] = useState([]);

  const amount = useMemo(() => basket.reduce((acc, { price }) => acc + price, 0), [basket]);

  const onAdd = (product) => {
    const inBasket = basket.find(({ id }) => product.id === id);
    if (inBasket) {
      setBasket((prev) => prev.filter(({ id }) => id !== product.id));
    } else {
      setBasket((prev) => [...prev, product]);
    }
  };

  useEffect(() => {
    if (basket.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        title: `Купить: ${amount} руб.`,
      });
    }
  }, [amount, basket, tg.MainButton]);

  return (
    <div className="list">
      {products.map((product) => (
        <ProductItem product={product} className="item" key={Date.now()} onAdd={onAdd} />
      ))}
    </div>
  );
};
