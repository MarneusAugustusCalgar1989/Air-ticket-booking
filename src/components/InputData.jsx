import React, { useEffect, useState } from 'react'

const InputData = ({ takeData }) => {
  const [inputCheck, setInputCheck] = useState({
    origin: false,
    destination: false,
    date: false,
  })

  const [inputData, setInputData] = useState({
    originCode: '',
    destinationCode: '',
    flightDate: '',
  })

  useEffect(() => {
    makeDate()
    setInputData({ ...inputData, flightDate: todayDate })
  }, [window])

  let todayDate = ''
  const makeDate = () => {
    const nowDate = new Date()
    let nowDay = nowDate.getDate()
    if (nowDay < 10) {
      let arr = [0]
      arr.push(nowDay)
      nowDay = arr.join('')
    }

    let nowMonth = nowDate.getMonth() + 1

    if (nowMonth < 10) {
      let arr = [0]
      arr.push(nowMonth)
      nowMonth = arr.join('')
    }

    let newformdate = [nowDay, nowMonth, nowDate.getFullYear()]
    todayDate = newformdate.reverse().join('-')
  }

  let acQuery =
    'https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=airport&types[]=city&term='

  const originInput = () => {
    let origin = document.querySelector('.origin')

    if (origin.value === '') {
      origin.style.border = '1px solid black'
      origin.style.outlineColor = 'black'
      setInputCheck({ ...inputCheck, origin: false })
    } else {
      fetch(acQuery + origin.value)
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            if (data[0].name.toLowerCase() === origin.value.toLowerCase()) {
              origin.style.outlineColor = 'green'
              origin.style.border = '2px solid green'
              setInputData({ ...inputData, originCode: data[0].code })
              setInputCheck({ ...inputCheck, origin: true })
            } else {
              origin.style.outlineColor = 'red'
              setInputCheck({ ...inputCheck, origin: false })

              origin.style.border = '2px solid red'
            }
          }
        })
    }
  }

  const destinationInput = () => {
    let destination = document.querySelector('.destination')

    if (destination.value === '') {
      destination.style.border = '1px solid black'
      destination.style.outlineColor = 'black'
      setInputCheck({ ...inputCheck, destination: false })
    } else {
      fetch(acQuery + destination.value)
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            if (
              data[0].name.toLowerCase() === destination.value.toLowerCase()
            ) {
              destination.style.outlineColor = 'green'
              destination.style.border = '2px solid green'
              setInputData({ ...inputData, destinationCode: data[0].code })
              setInputCheck({ ...inputCheck, destination: true })
            } else if (
              data[0].name.toLowerCase() !== destination.value.toLowerCase()
            ) {
              destination.style.outlineColor = 'red'
              destination.style.border = '2px solid red'
              setInputCheck({ ...inputCheck, destination: false })
            }
          }
        })
    }
  }

  const addAdress = (e) => {
    e.preventDefault()

    return takeData(inputData)

    // setInputCheck({ origin: false, destination: false, date: false });

    // document.querySelector('.origin').value = '';
    // document.querySelector('.origin').style.border = '1px solid black';
    // document.querySelector('.origin').style.outlineColor = 'black';
    // document.querySelector('.destination').value = '';
    // document.querySelector('.destination').style.border = '1px solid black';
    // document.querySelector('.destination').style.outlineColor = 'black';

    // document.querySelector('input[type="date"]').value = todayDate;
  }
  return (
    <div
      className="input_wrapper"
      onLoad={() => {
        makeDate()
        setInputData({ ...inputData, flightDate: todayDate })
      }}
    >
      <form
        onSubmit={(e) => {
          addAdress(e)
        }}
      >
        <input
          type="text"
          placeholder="Откуда"
          name="origin"
          className="origin"
          onChange={() => {
            originInput()
          }}
        ></input>
        <input
          type="text"
          placeholder="Куда"
          name="destination"
          className="destination"
          onChange={() => {
            destinationInput()
          }}
        ></input>
        <input
          type="date"
          id="start"
          name="trip-start"
          min={todayDate}
          max="2025-01-01"
          value={inputData.flightDate}
          onChange={(e) => {
            setInputCheck({ ...inputCheck, date: true })
            setInputData({ ...inputData, flightDate: e.target.value })
          }}
        />

        {!Object.values(inputCheck).includes(false) && <input type="submit" />}
      </form>
    </div>
  )
}

export default InputData
