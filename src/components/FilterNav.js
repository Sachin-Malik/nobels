import React from 'react'
import CatergoryFilter from './CatergoryFilter'
import TwoTimer from './TwoTimer'
import YearFilter from './YearFilter'

function FilterNav({catergoryBoxes,catergotyCheckBoxClicked,yearBoxes,yearCheckBoxClicked}) {
    return (
       <div className='row px-5'>
         <CatergoryFilter 
            catergoryBoxes={catergoryBoxes} 
            catergotyCheckBoxClicked={catergotyCheckBoxClicked}
         />
         <YearFilter 
            yearBoxes={yearBoxes}
            yearCheckBoxClicked={yearCheckBoxClicked}
          />
          <TwoTimer />
       </div>
    )
}

export default FilterNav
