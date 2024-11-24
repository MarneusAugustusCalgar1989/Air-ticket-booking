const BookingSuccess = ({
  showAllBookingData,
  setBookingWindow,
  setShowSuccess,
}) => {
  return (
    <div className="sucess_card test_in">
      <h1
        className="close_modal_window_button"
        onMouseOver={(e) => {
          e.target.parentNode.classList.remove('test_in')
        }}
        onClick={(e) => {
          e.target.parentNode.classList.add('el_remove_anim')
          setTimeout(() => {
            setBookingWindow(false)
            setShowSuccess(false)
          }, 500)
        }}
      >
        &times;
      </h1>
      <h1
        onClick={() => {
          showAllBookingData()
        }}
      >
        Билет успешно забронирован
      </h1>
    </div>
  )
}

export default BookingSuccess
