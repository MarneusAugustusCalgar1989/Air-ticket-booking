import { useEffect, useState } from 'react';
import './App.css';
import FlyCard from './components/FlyCard';
import FilterByTransfer from './components/FilterByTransfer';
import SortBy from './components/SortBy';
import InputData from './components/InputData';
import WeeklyFlyCard from './components/WeeklyFlyCard';

function App() {
  const [airlineData, setAirlineData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [ready, setReady] = useState(false);
  const [dataToSend, setDataToSend] = useState({ def: 'def' });

  const [sorters, setSorters] = useState('price');
  const [listingLoader, setListingLoader] = useState(true);

  const [noTickets, setNoTickets] = useState(false);

  const [spinner, setSpinner] = useState(false);
  const [smallSpinner, setSmallSpinner] = useState(false);

  const [filters, setFilters] = useState(['4']);

  useEffect(() => {
    airlineQuery();
  }, [window]);

  const getFilters = value => {
    setFilters(value);
  };

  const takeData = value => {
    setDataToSend(value);

    setReady(true);

    if (Object.keys(dataToSend).length > 2) {
      setSmallSpinner(true);
    } else {
      setSpinner(true);
    }
  };

  const airlineQuery = () => {
    fetch('http://213.59.156.172:3000/get_airlines')
      .then(response => response.json())
      .then(data => {
        setAirlineData(data);
        setReady(true);
      });
  };

  useEffect(() => {
    ticketQuery();
  }, [dataToSend]);

  const initData = `{"query":"{prices_one_way(params: {origin: \\"${dataToSend.originCode}\\", destination: \\"${dataToSend.destinationCode}\\", depart_months: \\"${dataToSend.flightDate}\\", no_lowcost: false}paging: {limit: 10, offset:0}sorting: ROUTE_WEIGHT_DESC currency:\\"RUB\\" grouping: DEPART_DATE)  {departure_at value currency distance duration ticket_link number_of_changes main_airline trip_class}}"}`;

  const ticketQuery = () => {
    fetch('http://213.59.156.172:3000/ql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setMyData(data.data.prices_one_way);
          setNoTickets(false);
          setListingLoader(false);
          setSpinner(false);
          setSmallSpinner(false);
          // myData.map(el => {
          //   if (
          //     el.departure_at.split('T')[0].toString() === dataToSend.flightDate
          //   ) {
          //     console.log(el);
          //   }
          // });
          if (data.data.prices_one_way.length === 0) {
            console.log('Таких билетов нету');
            setNoTickets(true);
          }
        }
      });
  };

  return (
    <div className='App'>
      {!ready && (
        <div className='app_loader'>
          <h1>Loading...</h1>
        </div>
      )}
      {ready && (
        <div className='app_wrapper'>
          <h1>ЛОГО</h1>
          {airlineData.length > 0 && (
            <div className='inputField'>
              <InputData takeData={takeData} />
            </div>
          )}

          {spinner && (
            <div className='app_loader small'>
              <h1>Loading...</h1>
            </div>
          )}

          {!listingLoader && (
            <SortBy
              className='sortBy'
              myData={dataToSend}
              flightData={myData}
              setSorters={setSorters}
              setMyData={setMyData}
            />
          )}
          {!listingLoader && (
            <FilterByTransfer
              className='filterByTransfer'
              myData={dataToSend}
              flightData={myData}
              setFilters={setFilters}
              filters={filters}
              getFilters={getFilters}
            />
          )}

          <div className='flycarHolder'>
            {smallSpinner && (
              <div className='app_loader small'>
                <h1>Loading...</h1>
              </div>
            )}
            {noTickets && (
              <div className='app_loader small'>
                <h1>Таких билетов нету</h1>
              </div>
            )}
            {!smallSpinner &&
              myData.map(el => {
                return (
                  <WeeklyFlyCard
                    flyData={el}
                    inputData={dataToSend}
                    airlineData={airlineData}
                    key={el.departure_at}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
//  token
// {
//   "X-Access-token": "bc99cead7d4f7cbf0b85723bcb406ea0"
//   }
export default App;