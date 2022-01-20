const years = [];

for(let i=1900;i<=2018;i+=11){
    years.push(i+' - '+(i+10));
}
years.reverse();
export default years;