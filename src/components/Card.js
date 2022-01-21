import React from 'react'

function Card({data}) {
    return (
        <div className='col-10 col-md-5 my-3 text-center my-card rounded drop-shadow'>
            <p className='category card rounded'>{data.category}</p>
            <div className='row'>
                 <div className='d-inline font-weight-bold'>Year :</div><div className='d-inline'>{data.year}</div>
            </div>
            <div className="row font-weight-bold">Laureate/s</div>
            {data.laureates.map((item,id)=>{
                return  <div key={id} className='d-inline text-left'> {item.firstname} {item.secondname} ,</div>
            })}
            <div className='row text-left'>
              <div className='d-inline font-weight-bold'>Motivation:</div><div className='d-inline'>{data.laureates[0].motivation.slice(1,-1)}</div>
              </div>
        </div> 
    )
}

export default Card
