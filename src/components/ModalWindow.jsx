import React, { useEffect } from 'react';

const ModalWindow = ({ data, setModal, getClicked }) => {
  useEffect(() => {
    if (document.querySelector('.modal_container')) {
      document
        .querySelector('.modal_container')
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [setModal]);

  return (
    <div>
      <div className='modal_container'>
        <div className='modal_header_wraper'>
          <h1>Полетная карточка</h1>
          <h1
            className='close_modal_window_button'
            onClick={() => {
              setModal(false);
              document.querySelector('.clicked').classList.toggle('clicked');
              getClicked(false);
            }}
          >
            &times;
          </h1>
        </div>
        <div className='modal_content_wraper'>
          <div className='modal_content_from'>
            <h2>{data.origin}</h2>
            <h2>{data.airlineName}</h2>
            <h2>{data.destination}</h2>
          </div>
          <div className='modal_content_details'>
            <div className='modal_content_fly_details_wraper'>
              <div className='modal_content_fly_details'>
                <p>Расстояние: {data.airDistance} км</p>
                <p>Длительность: {data.durationTime} ч.</p>
                <p>Количество пересадок: {data.numberOfChanges}</p>
              </div>
              <div className='modal_content_fly_details'>
                <p>
                  Дата вылета: <b>{data.airDate}</b>
                </p>
                <p>
                  Время вылета: <b>{data.airTime}</b>
                </p>
                <p>
                  Класс: <b>{data.airClass}</b>
                </p>
              </div>
            </div>

            <div className='modal_content_fly_price_details'>
              <h1>Цена: {data.price} р.</h1>
            </div>
          </div>

          <button className='modal_content_buy_ticket'>
            <a href={data.ticketLink} target='blank'>
              Купить билет
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
