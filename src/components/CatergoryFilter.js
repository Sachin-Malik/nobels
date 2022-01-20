import React from 'react'
import optionList from '../data/prize_category'

function CatergoryFilter({catergoryBoxes,catergotyCheckBoxClicked}) {
    return (
        <div className="dropdown show">
        <a className=" btn filter-btn dropdown-toggle" href="#top" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Catergory
        </a>
        
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {optionList.map((item,id)=>{
             return (<a href="#top" key={id} className='dropdown-item'>
             <input type="checkbox" checked={catergoryBoxes[id]} onChange={()=>{catergotyCheckBoxClicked(id)}}/> {item}
             </a>)
          })}
        </div>
      </div> 
    )
}

export default CatergoryFilter
