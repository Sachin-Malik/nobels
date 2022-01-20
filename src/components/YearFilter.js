import React from 'react'
import optionList from '../data/years';
function YearFilter({yearBoxes,yearCheckBoxClicked}) {
    return (
        <div className="dropdown show mx-2">
        <a className=" btn filter-btn dropdown-toggle" href="#top" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Year
        </a>
        
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {optionList.map((item,id)=>{
             return (<a href="#top" key={id} className='dropdown-item'>
             <input type="checkbox" checked={yearBoxes[id]} onChange={()=>yearCheckBoxClicked(id)} /> {item}
             </a>)
          })}
        </div>
      </div> 
    )
}

export default YearFilter
