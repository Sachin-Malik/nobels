import React from 'react';

function SpecialCard({data}) {
    console.log('this');
    console.log(data);
   return (
    <div className='col-10 col-md-5 my-3 text-center my-card rounded drop-shadow'>
      <p className='category card rounded'>{data.timesWin} Time Winner</p>
      <div className='row'>
           <div className='d-inline font-weight-bold'>Name :</div><div className='d-inline'> {data.firstname} {(data.surname?data.surname:null)}</div>
      </div>
      <div className="row font-weight-bold">Years</div>
      {data.years.map((item,id)=>{
          return  <div key={id} className='d-inline text-left'> {item} ,</div>
      })}
      <div className="row font-weight-bold">Categories/s</div>
      {data.categories.map((item,id)=>{
          return  <div key={id} className='d-inline text-left'> {item} ,</div>
      })}
    </div> 
   )
}

export default SpecialCard;
