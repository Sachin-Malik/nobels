import {useState,useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import PRIZE_CATEGORY from './data/prize_category';
import Years from './data/years';
import Grid from './components/Grid'
import FilterNav from './components/FilterNav';
import NoResult from './components/NoResult'
import MutliWinners from './components/MutliWinners';


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
  var twoTimeWinners =[];
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
  var mulitiWinnersData=[];
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
  let multiWinners=new Map();
  const multipleTimesWinners = ()=>{

    if(twoTimeWinners.length===0&&data&&data.length!==0){
    let nameToWins =new Map();
    for(let i=0;i<data.length;i++){
          if(data[i].laureates){
            for(let j=0;j<data[i].laureates.length;j++){
               if(nameToWins.has(data[i].laureates[j].id))
               nameToWins.set(data[i].laureates[j].id,(nameToWins.get(data[i].laureates[j].id)+1));
               else
               nameToWins.set(data[i].laureates[j].id,1);
            }
          }
      }
      const ids=[];
      for( const [key,value] of nameToWins.entries()){
         if(value>1){
           ids.push(parseInt(key));
         }
      }
      
      for(let i=0;i<data.length;i++){
        if(data[i].laureates){
          for(let j=0;j<data[i].laureates.length;j++){
             if(ids.includes(parseInt(data[i].laureates[j].id))){
               multiWinners[data[i].laureates[j].id]={...data[i].laureates[j],timesWin:nameToWins.get(data[i].laureates[j].id),years:[],categories:[]};
             }  
          }
        }
      }

      for(let i=0;i<data.length;i++){
        if(data[i].laureates){
          for(let j=0;j<data[i].laureates.length;j++){
             if(ids.includes(parseInt(data[i].laureates[j].id))){
               multiWinners[data[i].laureates[j].id]['years'].push(data[i].year);
               multiWinners[data[i].laureates[j].id]['categories'].push(data[i].category);
             }
          }
        }
      }

      for(var m in multiWinners)
        mulitiWinnersData.push(multiWinners[m]);
      
      
       console.log(mulitiWinnersData)

    }
   
  }
  multipleTimesWinners();
 
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
      <div className='row ml-4 px-0'>
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
      </div>
      <h1 id="twotimers" className='my-5 text-center heading'>Multi Time Winners</h1>
       {(mulitiWinnersData.length===0||isLoading)?<NoResult />:<MutliWinners items={mulitiWinnersData}/>}
    </div>
  );
}

export default App;
