import { Button } from "../Button/Button";
import "./Header.css";

export const Header = () => {
  const tg = window.Telegram.WebApp;
  const onClose = () => {
    tg.close();
  };
  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span>{tg.initDataUnsafe.user.username}</span>
    </div>
  );
};
