import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SortDisplay from './SortDisplay';

const Sort = () => {
    const [data, setData] = useState([0]);
    const [ isTrue, setIsTrue ] = useState(false);

    useEffect(() => {
        const getUrl = async() => {
            const res = await axios.get('https://newsdata.io/api/1/news?apikey=pub_177e9db72356919775d6af8a9a99d47927c&q=social')
            setData(res.data.results);
            console.log("sort",res.data.results);
        }
       
        getUrl();
    },[])

    function onSort() {
        console.log("hi")
        const sortedActivities = data.sort((a, b) => 
        {return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()})
        setData(sortedActivities);
        setIsTrue(true);
        console.log("sortedActivities",data);
    }
    const handleChange = () => {
        setIsTrue(false);
    }

    return (
        <div>
            <button onClick={onSort}>Sort</button>
            <button onClick={handleChange}>Unsort</button>
            {isTrue ? data.map(({ title,description })=> (
                <SortDisplay  
                title={title} description={description}/> 
            )): null}
        
            
        </div>
    )
}
export default  Sort;