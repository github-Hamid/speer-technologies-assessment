import React from 'react'
import "../css/time.css"
function Time(props) {
    let time = new Date(props.time);
      let month = <div className='div-date-item'>{time.toLocaleString('default', { month: 'short' })},</div>;
    let day = <div className='div-date-item'>{time.getUTCDate()} </div>
    let year = <div className='div-date-item'>{time.getUTCFullYear()}</div>
    console.log(month, " " ,  day, " " , year)
  return (
    <div className='date-header'>
        {month}{day}{year}
    </div>
  )
}

export default Time