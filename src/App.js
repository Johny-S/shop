import { useEffect } from "react";
import "./App.css";
import { Header } from './components/Header/Header';

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready(); // Сообщение телеграму, что приложение готово к отображению
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
