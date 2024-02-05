import React from 'react';

const SortBy = ({ setSorters, setMyData, flightData }) => {
  const activeFilter = e => {
    document.querySelectorAll('.sortButton').forEach(el => {
      el.classList.remove('active');
    });
    e.target.classList.add('active');
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
        Самый дешевый
      </div>
      <div
        className='sortButton'
        onClick={e => {
          sortByDuration(e);
        }}
      >
        Самый быстрый
      </div>
    </div>
  );
};

export default SortBy;
