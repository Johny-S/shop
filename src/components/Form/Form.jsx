import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

export const Form = () => {
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [subject, setSubject] = useState("person");

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    tg.sendData(
      JSON.stringify({
        country,
        city,
        subject,
      }),
    );
  }, [city, country, subject, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
    tg.MainButton.onClick(onSendData);
    return () => {
      tg.MainButton.offClick(onSendData);
    };
  }, [onSendData, tg.MainButton]);

  useEffect(() => {
    if (!country || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city, tg.MainButton]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        type="text"
        placeholder="Страна"
        onChange={onChangeCountry}
        value={country}
      />
      <input
        className="input"
        type="text"
        placeholder="Город"
        onChange={onChangeCity}
        value={city}
      />
      <select className="select" onChange={onChangeSubject} value={subject}>
        <option value="legal">Юр.лицо</option>
        <option value="person">Физ.лицо</option>
      </select>
    </div>
  );
};
