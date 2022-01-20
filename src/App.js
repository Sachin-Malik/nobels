import {useState,useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import PRIZE_CATEGORY from './data/prize_category';
import Years from './data/years';
import Grid from './components/Grid'
import FilterNav from './components/FilterNav';
import NoResult from './components/NoResult'


const mapIndexForCategory = [];
for(let i=0;i<PRIZE_CATEGORY.length;i++){
  mapIndexForCategory[PRIZE_CATEGORY[i]]=i;
}
const mapIndexForYear = [];
for(let i=0;i<Years.length;i++){
  mapIndexForYear[Years[i]]=i;
}


function App() {
  
  const [isLoading,setIsLoading] = useState(true);
  const [data,setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [yearBoxes,setYearBoxes] = useState(new Array(Years.length).fill(true));
  const [catergoryBoxes,setcatergoryBoxes] = useState(new Array(PRIZE_CATEGORY.length).fill(true));

  const itemsPerPage = 10;
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      const res= await (await axios.get('http://api.nobelprize.org/v1/prize.json')).data.prizes;

      //filter data for given years
      function display(item){
        return item;
      }
      function inRange(item){
        return item.year<=2018;
      }
      const filteredRes = res.map(display).filter(inRange);

      setData(filteredRes);
      setIsLoading(false);
    }
    fetchData();


    //since data related to 2 time winners will never change we can get that data in here.
    
    
  }, []);
  

  const handleCatergoryCheckBoxClick = (index)=>{
     const newConfiguration = catergoryBoxes.map((item,id)=>{
        return (id===index?!item:item)
     })
     setcatergoryBoxes(newConfiguration);
  }
  
  const handleYearCheckBoxClick = (index) =>{
      const newConfiguration = yearBoxes.map((item,id)=>{
        return (id===index)?!item:item;
      })
      setYearBoxes(newConfiguration);
  }

  const handlePageChange = (data)=>{
    console.log(data.selected+1);
    setCurrentPage(data.selected+1);
  }
  
  const checkYear = (year) =>{
    const values=Object.keys(mapIndexForYear);
    var index=-1;
    for(let i=0;i<values.length;i++){
      const y1= parseInt(values[i].substring(0,4));
      const y2=parseInt(values[i].substring(values[i].length-4));
      if(year<=y2&&year>=y1){
        index=i;
        break;
      }
    }

    return yearBoxes[index];
  }
  
  var filteredData=[];
  var pageCount=0;
  const filterData = ()=>{

    if(data.length!==0){
      //filter data with respect of catergoryBoxes
      for(let i=0;i<data.length;i++){
         if(catergoryBoxes[mapIndexForCategory[data[i].category]]&&checkYear(data[i].year))
          filteredData.push(data[i]);
      }
      
      pageCount=(Math.ceil(filteredData.length/10));
      const indexOfLastItem= currentPage*itemsPerPage;
      const indexOfFirstItem= indexOfLastItem-itemsPerPage;
      filteredData = filteredData.slice(indexOfFirstItem,indexOfLastItem);
    }

  }
  
  filterData();
  // const getTwoTimer = ()=>{

  //   if(twoTimeWinners.length===0&&data&&data.length!==0){
  //   let nameToWins =new Map();
  //   for(let i=0;i<data.length;i++){
  //         if(data[i].laureates){
  //           for(let j=0;j<data[i].laureates.length;j++){
  //               nameToWins[data[i].laureates[j].id]++;
  //           }
  //         }
  //     }
  //     console.log(nameToWins);
     
  //   }
   
  // }
  // getTwoTimer();
  console.log(data);
  return (
    <div className='container'>
      <h1 className='my-5 text-center heading'>Nobel Winners</h1>
      <FilterNav 
        catergoryBoxes={catergoryBoxes} 
        yearBoxes={yearBoxes}
        catergotyCheckBoxClicked={handleCatergoryCheckBoxClick}
        yearCheckBoxClicked={handleYearCheckBoxClick}
      />
      {(filteredData.length===0||isLoading)?<NoResult />:<Grid items={filteredData}/>}
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      <h1 id="twotimers" className='my-5 text-center heading'>Two Time Winners</h1>

    </div>
  );
}

export default App;
