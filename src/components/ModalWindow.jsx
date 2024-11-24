import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { bookingInitValue } from '../hoc/bookingFormConfig'
import BookingSuccess from './BookingSuccess'

const ModalWindow = ({ data, setModal, getClicked }) => {
  useEffect(() => {
    if (document.querySelector('.modal_container')) {
      document
        .querySelector('.modal_container')
        .scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [setModal])

  const [bookingWindow, setBookingWindow] = useState(false)
  const [bookingData, setBookingData] = useState({})
  const [bookingValid, setBookingValid] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
  })

  const [showSuccess, setShowSuccess] = useState(false)

  const sendBookingData = (e) => {
    if (!Object.values(bookingValid).includes(false)) {
      setShowSuccess(true)

      document.querySelector('.modal_container').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
    console.log(bookingData, bookingValid)
  }
  const showAllBookingData = () => {
    alert(
      `Data ready to send ${JSON.stringify(Object.assign(bookingData, data))}`
    )
  }

  const getBookingData = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'name' || name === 'surname') {
      const regexp = /^[а-яё]+(?:[ -]{1}[а-яё]*)?$/i
      if (regexp.test(value) || value === '') {
        e.target.style.border = 'none'
        setBookingData((prev) => ({ ...prev, [name]: value }))
        setBookingValid((prev) => ({ ...prev, [name]: true }))
      } else {
        e.target.style.border = '2px solid red'
        setBookingValid((prev) => ({ ...prev, [name]: false }))
      }
    }
    if (name === 'email') {
      const regexp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (regexp.test(value) || value === '') {
        e.target.style.border = 'none'
        setBookingData((prev) => ({ ...prev, [name]: value }))
        setBookingValid((prev) => ({ ...prev, [name]: true }))
      } else {
        e.target.style.border = '2px solid red'
        setBookingValid((prev) => ({ ...prev, [name]: false }))
      }
    }

    if (name === 'phone') {
      const regexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

      if (regexp.test(value) || value === '') {
        e.target.style.border = 'none'
        setBookingData((prev) => ({ ...prev, [name]: value }))
        setBookingValid((prev) => ({ ...prev, [name]: true }))
      } else {
        e.target.style.border = '2px solid red'
        setBookingValid((prev) => ({ ...prev, [name]: false }))
      }
    }
  }

  return (
    <div>
      <div className="modal_container">
        {showSuccess && (
          <BookingSuccess
            showAllBookingData={showAllBookingData}
            setBookingWindow={setBookingWindow}
            setShowSuccess={setShowSuccess}
          />
        )}
        <div className="modal_header_wraper">
          <h1>Полетная карточка</h1>
          <h1
            className="close_modal_window_button"
            onClick={(e) => {
              e.target.parentNode.parentNode.parentNode.classList.add(
                'el_remove_anim'
              )
              setTimeout(() => {
                setModal(false)
                document.querySelector('.clicked').classList.toggle('clicked')
                getClicked(false)
              }, 500)
            }}
          >
            &times;
          </h1>
        </div>
        <div className="modal_content_wraper">
          <div className="modal_content_from">
            <h2>{data.origin}</h2>
            <h2>{data.airlineName}</h2>
            <h2>{data.destination}</h2>
          </div>
          <div className="modal_content_details">
            <div className="modal_content_fly_details_wraper">
              <div className="modal_content_fly_details">
                <p>Расстояние: {data.airDistance} км</p>
                <p>Длительность: {data.durationTime} ч.</p>
                <p>Количество пересадок: {data.numberOfChanges}</p>
              </div>
              <div className="modal_content_fly_details">
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

            <div className="modal_content_fly_price_details">
              <h1>Цена: {data.price} р.</h1>
            </div>
          </div>

          {bookingWindow && (
            <BookingForm
              sendBookingData={sendBookingData}
              setBookingData={getBookingData}
              bookingData={bookingData}
            />
          )}

          <button
            className="modal_content_buy_ticket"
            onClick={(e) => {
              !bookingWindow ? setBookingWindow(true) : sendBookingData(e)
            }}
          >
            {bookingWindow ? (
              <a>Отправить данные</a>
            ) : (
              <a>Забронировать билет</a>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
