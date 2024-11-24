import { useEffect, useState } from 'react'
import './App.css'
import FlyCard from './components/FlyCard'
import FilterByTransfer from './components/FilterByTransfer'
import SortBy from './components/SortBy'
import InputData from './components/InputData'
import WeeklyFlyCard from './components/WeeklyFlyCard'

function App() {
  const [airlineData, setAirlineData] = useState([])
  const [myData, setMyData] = useState([])
  const [ready, setReady] = useState(false)
  const [dataToSend, setDataToSend] = useState({ def: 'def' })

  const [sorters, setSorters] = useState('')
  const [listingLoader, setListingLoader] = useState(true)

  const [noTickets, setNoTickets] = useState(false)

  const [spinner, setSpinner] = useState(false)
  const [smallSpinner, setSmallSpinner] = useState(false)

  const [filters, setFilters] = useState(['4'])

  const [clicked, setClicked] = useState(false)
  const [ticketsLoaded, settTicketsLoaded] = useState(false)

  const [error, setError] = useState('')

  const getClicked = (value) => {
    setClicked(value)
  }

  useEffect(() => {
    airlineQuery()
  }, [])

  const getFilters = (value) => {
    setFilters(value)
  }

  const takeData = (value) => {
    setDataToSend(value)
    setReady(true)

    if (Object.keys(dataToSend).length > 2) {
      setSmallSpinner(true)
    } else {
      setSpinner(true)
    }
    setNoTickets(false)
  }

  const airlineQuery = () => {
    fetch('http://213.59.156.172:3000/get_airlines')
      .then((response) => response.json())
      .then((data) => {
        setAirlineData(data)
        setError(false)
      })
      .catch((error) => {
        setError(error.message)
        alert(
          'Сервер сервиса временно отключен. Обратитесь к разработчику за уточнениями.'
        )
      })
      .finally(() => {
        setReady(true)
      })
  }

  useEffect(() => {
    ticketQuery()
  }, [dataToSend])

  const initDataNoGraph = {
    currency: 'rub',
    show_to_affiliates: 'true',
    origin: dataToSend.originCode,
    destination: dataToSend.destinationCode,
  }

  const ticketQuery = () => {
    fetch('http://213.59.156.172:3000/alltickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initDataNoGraph),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setMyData(data.data)
          setNoTickets(false)
          setListingLoader(false)
          setSpinner(false)
          setSmallSpinner(false)

          if (data.data.prices_one_way.length === 0) {
            setNoTickets(true)
          }
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => {})
  }

  return (
    <div className="App">
      {!ready && (
        <div className="app_loader">
          <svg className="app_svg_spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20"></circle>
          </svg>
        </div>
      )}

      {ready && (
        <div className="app_wrapper">
          {/* <h1>ЛОГО</h1> */}
          <div className="image_holder">
            {/* <img className='main_logo' src='./images/logo.png'></img> */}
            <i className="bx bxs-plane-alt"></i>
          </div>

          {airlineData.length > 0 && (
            <div className="inputField">
              <InputData takeData={takeData} />
            </div>
          )}

          {spinner && (
            <div className="app_loader small">
              <svg className="app_svg_spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20"></circle>
              </svg>
            </div>
          )}

          {!listingLoader && (
            <SortBy
              className="sortBy"
              myData={dataToSend}
              flightData={myData}
              setSorters={setSorters}
              setMyData={setMyData}
              spinner={spinner}
              smallSpinner={smallSpinner}
            />
          )}
          {!listingLoader && (
            <FilterByTransfer
              className="filterByTransfer"
              myData={dataToSend}
              flightData={myData}
              setFilters={setFilters}
              filters={filters}
              getFilters={getFilters}
            />
          )}

          <div className="flycardHolder">
            {smallSpinner && (
              <div className="app_loader small">
                <svg className="app_svg_spinner" viewBox="0 0 50 50">
                  <circle className="path" cx="25" cy="25" r="20"></circle>
                </svg>
              </div>
            )}
            {noTickets && (
              <div className="app_loader small">
                <h1>Таких билетов нету</h1>
              </div>
            )}
            {!smallSpinner &&
              myData.map((el) => {
                return (
                  <WeeklyFlyCard
                    flyData={el}
                    inputData={dataToSend}
                    airlineData={airlineData}
                    key={myData.indexOf(el)}
                    getClicked={getClicked}
                    clicked={clicked}
                  />
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
