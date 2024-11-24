export const bookingFormConfig = [
  {
    name: 'name',
    placeholder: 'Например, Иван',
    title: 'Введите имя',
    required: true,
    maxLength: 20,
  },
  {
    name: 'surname',
    placeholder: 'Например, Иванов',
    title: 'Введите фамилию',
    required: true,
    maxLength: 20,
  },
  {
    name: 'email',
    placeholder: 'thisis@example.com',
    title: 'email',
    required: true,
  },
  {
    name: 'phone',
    title: 'Номер телефона',
    placeholder: '+7...',
    required: true,
    type: 'tel',
  },
]

export const bookingInitValue = {
  name: '',
  surname: '',
  email: '',
  phone: '',
}
