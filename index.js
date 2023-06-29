const dateDiff = (startDate, endDate) => {
  const startYear = startDate.getFullYear()
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let yearDiff = endDate.getFullYear() - startYear
  let monthDiff = endDate.getMonth() - startDate.getMonth()
  if (monthDiff < 0) {
    yearDiff--
    monthDiff += 12
  }
  let dayDiff = endDate.getDate() - startDate.getDate()
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--
    } else {
      yearDiff--
      monthDiff = 11
    }
    dayDiff += daysInMonth[startDate.getMonth()]
  }

  return {
    y: yearDiff,
    m: monthDiff,
    w: Math.trunc(dayDiff / 7),
    d: Math.trunc(dayDiff % 7)
  }
}

var haveError = false

const date = () => {
  let d = document.querySelector('.d-input')
  let m = document.querySelector('.m-input')
  let y = document.querySelector('.y-input')

  let d_label = document.querySelector('.d-label')
  let m_label = document.querySelector('.m-label')
  let y_label = document.querySelector('.y-label')

  let error_msgs = document.querySelectorAll('.error-sub')

  if (!haveError) {
    dClass = d.className
    mClass = m.className
    yClass = y.className

    d_labelClass = d_label.className
    m_labelClass = m_label.className
    y_labelClass = y_label.className
  }

  if (d.value === '' || m.value === '' || y.value === '') {
    haveError = true
    d_label.className += ' error'
    m_label.className += ' error'
    y_label.className += ' error'

    d.className += ' error'
    m.className += ' error'
    y.className += ' error'

    error_msgs.forEach(error_msg => error_msg.style.display = 'block')
    return
  }

  d_label.className = d_labelClass
  m_label.className = m_labelClass
  y_label.className = y_labelClass

  d.className = dClass
  m.className = mClass
  y.className = yClass

  error_msgs.forEach(error_msg => error_msg.style.display = 'none')

  let d_output = document.querySelector('.d-output')
  let m_output = document.querySelector('.m-output')
  let y_output = document.querySelector('.y-output')

  const startDate = new Date(y.value, m.value - 1, d.value)

  const res = dateDiff(startDate, new Date())

  d_output.innerHTML = res.d
  m_output.innerHTML = res.m
  y_output.innerHTML = res.y
}


window.onload = (event) => (
  document.querySelector('.btn').addEventListener('click', date)


)
