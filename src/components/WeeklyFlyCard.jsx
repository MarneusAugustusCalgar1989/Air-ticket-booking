import React, { useState } from 'react'
import ModalWindow from './ModalWindow'

const WeeklyFlyCard = ({
  flyData,
  inputData,
  airlineData,
  getClicked,
  clicked,
}) => {
  const [modal, setModal] = useState(false)

  const priceReview = (priceNumber) => {
    let newNumber = flyData.value.toString()

    if (newNumber.includes('.')) {
      newNumber = newNumber.split('.')
      let priceArr = Array.from(newNumber[0])
      priceArr.splice(-3, 0, ' ')

      return priceArr.join('') + '.' + newNumber[1]
    }

    flyData.value.toString()
    let priceArr = Array.from(newNumber)
    priceArr.splice(-3, 0, ' ')
    return priceArr.join('')
  }

  // Переводим название авиакомпании на человеческий язык (если есть)

  // const airlineCodeCorrector = (airlineCode) => {
  //   let found = airlineData.find((el) => {
  //     return el.code === airlineCode
  //   })

  //   if (!found.name) {
  //     return found.name_translations.en
  //   } else {
  //     return found.name
  //   }
  // }

  const durationCorrector = (duration) => {
    if (duration.toString().includes('.')) {
      let minutes = (Array.from(duration.toString()).slice(-1) * 60) / 10
      if (minutes < 10) {
        minutes = Array.from(minutes.toString())
        minutes.splice(0, 0, '0')
        const correctDuration =
          Array.from(duration).slice(0, -1).join('') + minutes.join('')
        return correctDuration
      } else {
        const correctDuration =
          Array.from(duration).slice(0, -1).join('') + minutes.toString()
        return correctDuration
      }
    } else {
      return duration
    }
  }

  const classConverter = (litera) => {
    if (litera === 'Y' || litera === 0) {
      return 'Эконом'
    } else if (litera === 'C' || litera === 1) {
      return 'Бизнес-класс'
    } else if (litera === 'F' || litera === 2) {
      return 'Первый класс'
    } else if (litera === 'W') {
      return 'Премиум-эконом'
    } else {
      return 'Нет информации о классе'
    }
  }

  //  Приводим сложные данные времени в человеческий вид
  // const dateConverter = (flyDate) => {
  //   return flyDate.split('T')
  // }

  const price = priceReview(flyData.value)
  // const airlineName = airlineCodeCorrector(flyData.main_airline)
  const durationTime = durationCorrector((flyData.duration / 60).toFixed(1))
  const airClass = classConverter(flyData.trip_class)
  const numberOfChanges = flyData.number_of_changes
  const airDistance = flyData.distance
  // const airDate = dateConverter(flyData.departure_at)[0]
  // const airTime = dateConverter(flyData.departure_at)[1]

  const airDate = flyData.depart_date
  // const ticketLink = `https://aviasales.ru/search/${flyData.ticket_link}`
  const origin = inputData.originPlace
  const destination = inputData.destinationPlace

  const dataForModal = {
    price: price,
    // airlineName: airlineName,
    // flightFrom: ,
    // flightTo:,
    durationTime: durationTime,
    airClass: airClass,
    numberOfChanges: numberOfChanges,
    airDistance: airDistance,
    airDate: airDate,
    // airTime: airTime,
    // ticketLink: ticketLink,
    origin: origin,
    destination: destination,
  }
  return (
    <div>
      <div>
        {modal && (
          <ModalWindow
            data={dataForModal}
            setModal={setModal}
            getClicked={getClicked}
          />
        )}
        <div
          className={
            // inputData.flightDate === dateConverter(airDate)[0]
            (inputData.flightDate = flyData.depart_date
              ? 'flyContainer match_date'
              : 'flyContainer')
          }
          onClick={(e) => {
            if (!document.querySelector('.clicked') && !clicked) {
              e.target.parentNode.classList.toggle('clicked')
              setModal(true)
              getClicked(true)
            } else {
            }
          }}
          title={
            // inputData.flightDate === dateConverter(airDate)[0]
            (inputData.flightDate = flyData.depart_date
              ? 'Это билет на выбранную вами дату'
              : 'Нажмите, чтобы получить подробности')
          }
        >
          <p>Откуда: {origin}</p>
          <p>Куда: {destination}</p>
          <p>Цена: {price} Р </p>
          <p>Дата отправки: {airDate}</p>

          <p className="transfers">Пересадки: {numberOfChanges}</p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyFlyCard
