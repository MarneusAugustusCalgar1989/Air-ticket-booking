import React from 'react';

const FlyCard = ({ flyData }) => {
  let flyPrice = 0;
  const priceReview = priceNumber => {
    let newNumber = '';
    flyData.value
      ? (newNumber = flyData.value.toString())
      : (newNumber = flyData.price.toString());

    let priceArr = Array.from(newNumber);
    priceArr.splice(-3, 0, ' ');
    return (flyPrice = priceArr.join(''));
  };
  priceReview(flyData.price);

  return (
    <div>
      <div className='flyContainer'>
        <p>Откуда: {flyData.origin}</p>
        <p>Куда: {flyData.destination}</p>
        <p>Аирлайн: {flyData.airline}</p>
        <p>Цена: {flyPrice} Р </p>
        <p>Количество пересадок {flyData.transfers}</p>
        <p>Flight number {flyData.flight_number}</p>
        <p>Отправление в {flyData.departure_at}</p>
      </div>
    </div>
  );
};

export default FlyCard;
