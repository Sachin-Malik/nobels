import React from 'react'

import '../App.css'
import Card from './Card'

function Grid({items}) {

    if(!items||items.length===0)
    return null;

    return (
        <div className='row justify-content-around mb-3'>
          {items.map((item,id)=>{
              return (<Card key={id} data={item} />)
          })}
        </div>
    )
}

export default Grid
