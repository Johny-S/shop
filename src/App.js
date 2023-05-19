import { useEffect } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready(); // Сообщение телеграму, что приложение готово к отображению
  }, []);

  const onClose = () => {
    tg.close();
  };
  return (
    <div className="App">
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
