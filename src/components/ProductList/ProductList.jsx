import { useState, useEffect, useCallback } from "react";
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
  // const { tg, queryId } = useTelegram();
  // const [basket, setBasket] = useState([]);

  // const totalPrice = useMemo(() => basket.reduce((acc, { price }) => acc + price, 0), [basket]);

  // const onAdd = (product) => {
  //   const inBasket = basket.find(({ id }) => product.id === id);
  //   if (inBasket) {
  //     setBasket((prev) => prev.filter(({ id }) => id !== product.id));
  //   } else {
  //     setBasket((prev) => [...prev, product]);
  //   }
  // };

  // useEffect(() => {
  //   if (basket.length === 0) {
  //     tg.MainButton.hide();
  //   } else {
  //     tg.MainButton.show();
  //     tg.MainButton.setParams({
  //       text: `Купить: ${totalPrice} руб.`,
  //     });
  //   }
  // }, [totalPrice, basket, tg.MainButton]);

  // const onSendData = useCallback(() => {
  //   const data = {
  //     products: basket,
  //     totalPrice,
  //     queryId,
  //   };
  //   fetch("http://45.145.65.185:8000/web-data", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // }, [basket, queryId, totalPrice]);

  // useEffect(() => {
  //   tg.MainButton.onClick(onSendData);
  //   return () => {
  //     tg.MainButton.offClick(onSendData);
  //   };
  // }, [onSendData, tg.MainButton]);

  // return (
  //   <div className="list">
  //     {products.map((product, idx) => (
  //       <ProductItem product={product} className="item" key={Date.now() + idx} onAdd={onAdd} />
  //     ))}
  //   </div>
  // );

  const [isSent, setIsSent] = useState(false);

  const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

  const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
      const data = {
        products: addedItems,
        totalPrice: getTotalPrice(addedItems),
        queryId,
      }
      return fetch('http://45.145.65.185/web-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((data) => {
          setIsSent(JSON.stringify(data));
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map((item, idx) => (
                <ProductItem
                key={Date.now() + idx}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                    isSent={isSent}
                />
            ))}
        </div>
    );
};
