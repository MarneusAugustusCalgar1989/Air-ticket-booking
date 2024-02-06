import React from 'react';

const SortBy = ({ setSorters, setMyData, flightData }) => {
  const activeFilter = e => {
    if (document.querySelector('.sortButtonHolder').querySelector('.active')) {
      document
        .querySelector('.sortButtonHolder')
        .querySelector('.active')
        .classList.remove('active');
    }
    e.target.classList.value.includes('sortButton')
      ? e.target.classList.toggle('active')
      : e.target.parentNode.classList.toggle('active');
  };

  const sortByPrice = e => {
    flightData.sort((a, b) => {
      return a.value - b.value;
    });
    setMyData(flightData);
    setSorters('price');
    activeFilter(e);
  };
  const sortByDuration = e => {
    flightData.sort((a, b) => {
      return a.duration - b.duration;
    });
    setMyData(flightData);
    setSorters('duration');
    activeFilter(e);
  };

  return (
    <div className='sortButtonHolder'>
      <div
        className='sortButton'
        onClick={e => {
          sortByPrice(e);
        }}
      >
        <h2>Самый дешевый</h2>
      </div>
      <div
        className='sortButton'
        onClick={e => {
          sortByDuration(e);
        }}
      >
        <h2>Самый быстрый</h2>
      </div>
    </div>
  );
};

export default SortBy;
