import React, { useState } from 'react';
import ModalWindow from './ModalWindow';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

const WeeklyFlyCard = ({ flyData, inputData, airlineData, modalMaker }) => {
  const [modal, setModal] = useState(false);
  const priceReview = priceNumber => {
    let newNumber = flyData.value.toString();

    if (newNumber.includes('.')) {
      newNumber = newNumber.split('.');
      let priceArr = Array.from(newNumber[0]);
      priceArr.splice(-3, 0, ' ');

      return priceArr.join('') + '.' + newNumber[1];
    }

    flyData.value.toString();
    let priceArr = Array.from(newNumber);
    priceArr.splice(-3, 0, ' ');
    return priceArr.join('');
  };

  const airlineCodeCorrector = airlineCode => {
    let found = airlineData.find(el => {
      return el.code === airlineCode;
    });

    if (!found.name) {
      return found.name_translations.en;
    } else {
      return found.name;
    }
  };

  const durationCorrector = duration => {
    if (duration.toString().includes('.')) {
      let minutes = (Array.from(duration.toString()).slice(-1) * 60) / 10;
      if (minutes < 10) {
        minutes = Array.from(minutes.toString());
        minutes.splice(0, 0, '0');
        const correctDuration =
          Array.from(duration).slice(0, -1).join('') + minutes.join('');
        return correctDuration;
      } else {
        const correctDuration =
          Array.from(duration).slice(0, -1).join('') + minutes.toString();
        return correctDuration;
      }
    } else {
      return duration;
    }
  };

  const classConverter = litera => {
    if (litera === 'Y') {
      return 'Эконом';
    } else if (litera === 'C') {
      return 'Бизнес-класс';
    } else if (litera === 'F') {
      return 'Первый класс';
    } else if (litera === 'W') {
      return 'Премиум-эконом';
    } else {
      return 'Нет информации о классе';
    }
  };

  const dateConverter = flyDate => {
    return flyDate.split('T');
  };

  const price = priceReview(flyData.value);
  const airlineName = airlineCodeCorrector(flyData.main_airline);
  const durationTime = durationCorrector((flyData.duration / 60).toFixed(1));
  const airClass = classConverter(flyData.trip_class);
  const numberOfChanges = flyData.number_of_changes;
  const airDistance = flyData.distance;
  const airDate = dateConverter(flyData.departure_at)[0];
  const airTime = dateConverter(flyData.departure_at)[1];
  const ticketLink = `https://aviasales.ru/search/${flyData.ticket_link}`;
  const origin = inputData.originCode;
  const destination = inputData.destinationCode;

  const dataForModal = {
    price: price,
    airlineName: airlineName,
    durationTime: durationTime,
    airClass: airClass,
    numberOfChanges: numberOfChanges,
    airDistance: airDistance,
    airDate: airDate,
    airTime: airTime,
    ticketLink: ticketLink,
    origin: origin,
    destination: destination,
  };

  return (
    <div>
      <div>
        {modal && <ModalWindow data={dataForModal} setModal={setModal} />}
        <div
          className='flyContainer'
          onClick={e => {
            modal ? setModal(false) : setModal(true);
          }}
        >
          <p>Откуда: {origin}</p>
          <p>Куда: {destination}</p>
          <p>Цена: {price} Р </p>
          <p>Дата отправки: {airDate}</p>
          <p>Время отправки: {airTime}</p>
          <p className='transfers'>Пересадки: {numberOfChanges}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyFlyCard;
