import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Form/Form";
import "./App.css";

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready(); // Сообщение телеграму, что приложение готово к отображению
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="form" element={<Form />} />
      </Routes>
      {/* <button onClick={onToggleButton}>toggle</button> */}
    </div>
  );
}

export default App;
