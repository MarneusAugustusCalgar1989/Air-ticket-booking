const BookingInput = (props) => {
  const {
    placeholder,
    errorMessage,
    error = false,
    type,
    setBookingData,
    bookingData,
    title,
    ...rest
  } = props

  return (
    <label htmlFor="booking_input" className="booking_label">
      {title}
      <input
        className="booking_input"
        autoComplete="off"
        data-error={error}
        type={type || 'text'}
        {...rest}
        placeholder={placeholder}
        onChange={(e) => setBookingData(e)}
        value={bookingData[props.name]}
      />
    </label>
  )
}
export default BookingInput
