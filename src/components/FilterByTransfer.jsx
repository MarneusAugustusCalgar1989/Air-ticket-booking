import React from 'react'

const FilterByTransfer = ({
  myData,
  setFilters,
  filters,
  getFilters,
  flightData,
}) => {
  const checkListener = (e) => {
    const flyCards = document.querySelectorAll('.transfers')

    const explr = filters
    if (explr.length > 0 && explr.includes(e.target.value)) {
      explr.splice(explr.indexOf(e.target.value), 1)
    } else {
      explr.push(e.target.value)
    }
    if (filters.length === 0) {
      explr.push('4')
      document.getElementById('noSort').checked = true
    }
    if (filters.length > 1 && filters.includes('4')) {
      document.getElementById('noSort').checked = false
      explr.splice(explr.indexOf('4'), 1)
    }
    if (e.target.value === '4') {
      document.querySelectorAll('.checkbox').forEach((el) => {
        el.childNodes[0].checked = false
        explr.splice(0, explr.length, '4')

        document.getElementById('noSort').checked = true
      })
    }

    setFilters(explr)

    if (explr[0] === '4') {
      flyCards.forEach((el) => {
        el.parentNode.style.visibility = 'visible'
        el.parentNode.style.display = 'inherit'
      })
    } else {
      flyCards.forEach((el) => {
        if (!explr.includes(el.textContent.slice(-1))) {
          el.parentNode.style.visibility = 'collapse'
          el.parentNode.style.display = 'none'
        } else {
          el.parentNode.style.visibility = 'visible'
          el.parentNode.style.display = 'inherit'
        }
      })
    }
  }
  return (
    <div className="filterButtons_wrapper">
      <div className="filterButtons">
        <legend>
          <h4>Количество пересадок</h4>
        </legend>
        <div className="checkbox">
          <input
            type="checkbox"
            id="noSort"
            name="transferSort"
            value="4"
            onChange={(e) => {
              checkListener(e)
            }}
            defaultChecked
          />
          <label htmlFor="noSort">Все билеты</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="noTransfers"
            name="transferSort"
            value="0"
            onChange={(e) => {
              checkListener(e)
            }}
          />
          <label htmlFor="noTransfer">Без пересадок</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="oneTransfer"
            name="transferSort"
            value="1"
            onChange={(e) => {
              checkListener(e)
            }}
          />
          <label htmlFor="OneTransfer">Одна</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="twoTransfers"
            name="transferSort"
            value="2"
            onChange={(e) => {
              checkListener(e)
            }}
          />
          <label htmlFor="twoTransfers">Две</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="threeTransfers"
            name="transferSort"
            value="3"
            onChange={(e) => {
              checkListener(e)
            }}
          />
          <label htmlFor="twoTransfers">Три</label>
        </div>
      </div>
    </div>
  )
}

export default FilterByTransfer
