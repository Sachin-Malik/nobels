import React from 'react';
import SpecialCard from './SpecialCard';

function MutliWinners({items}) {
  return (
    <div className='row justify-content-around mb-3'>
    {items.map((item,id)=>{
        return (<SpecialCard key={id} data={item} />)
    })}
  </div>
  );
}

export default MutliWinners;
