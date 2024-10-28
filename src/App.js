import { useCallback, useEffect, useState } from "react";

function throttledfunction(fx){
  let timeout=null


  return function(...args){

    if(timeout===null){
   timeout=setTimeout(()=>{

      fx.apply(this,args)
     timeout=null
    },2000)
    
  }
}

}

function App() {
const[listData,setListData]=useState([])
const [pageNumber,setPageNumber]=useState(1)
const[isFetching,setIsFetching]=useState(false)


 // Function to handle scrolling and check if the user reached the bottom
 const handleScroll = useCallback(throttledfunction(() => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !isFetching) {
    setPageNumber((prevPage) => prevPage + 1);
  }
}), [isFetching]);
 const callbackFetch=useCallback(async () => {
  setIsFetching(true); // Set fetching flag to true
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`
    );
    const resData = await response.json();
    console.log(resData.length)
  
    setListData((prevData) => [...prevData, ...resData]);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsFetching(false); // Reset fetching flag
  }
},[pageNumber])

useEffect(()=>{
  window.addEventListener("scroll", handleScroll);

  return ()=>{
    window.removeEventListener("scroll",handleScroll)
  }
},[handleScroll])
// Attach the scroll event listener
useEffect(() => {
  callbackFetch()
},[callbackFetch])
  return (
    <div className="App">
  
      as
{listData?.map((ele,index)=><p key={`${ele.title} + ${index}`}>{ele.id}:{ele.body}</p>)}
{isFetching ? 'loading...': null}
    </div>
  );
}

export default App;
