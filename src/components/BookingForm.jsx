import { bookingFormConfig } from '../hoc/bookingFormConfig'
import BookingInput from '../hoc/BookingInput'

const BookingForm = ({ setBookingData, bookingData }) => {
  return (
    <div className="booking_form">
      <h2>Форма для бронирования</h2>
      {bookingFormConfig.map((item) => (
        <BookingInput
          key={item.name}
          {...item}
          setBookingData={setBookingData}
          bookingData={bookingData}
        />
      ))}
    </div>
  )
}
export default BookingForm
