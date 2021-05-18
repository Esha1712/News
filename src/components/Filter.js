import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SortDisplay from './SortDisplay';

 const Filter = () => {
     const [data, setData] = useState([0]);
     const [filtervalue,setFiltervalue] = useState('');
     const [isTrue, setIsTrue] = useState(false);
     const [idRender, setIdRender] = useState('');
     const [publishRender, setPublishRender] = useState('');

    useEffect(() => {
        const getUrl = async() => {
            const res = await axios.get('https://newsdata.io/api/1/news?apikey=pub_177e9db72356919775d6af8a9a99d47927c&q=social')
            setData(res.data.results);
            console.log("filter",res);
        }
       
        getUrl();
    },[])

    const onChange = (e) => {
        setFiltervalue(e.target.value);
    }
    

    let optionItems = data.map(({source_id}) =>
        <option key={source_id}>{source_id}</option>
    );

    let publishItems = data.map(({pubDate}) => 
        <option key = {pubDate}>{pubDate}</option>
    );

    const onhandleId = (e) => {
       setIdRender(e.target.value);
  
    }

    const onhandlePublish = (e) => {
        setPublishRender(e.target.value)
    }

    //const result = data.source_id.filter(source => source === );
    const onhandleFilter = () => {
        //const filterData = data.source_id.filter(source => source === idRender.includes())
        let res = data.filter(it => it.source_id.includes(idRender));
        setData(res);
        setIsTrue(true);
        console.log("sourceid", res);
    }

    const onhandleDate = () => {
        //const filterData = data.pubDate.filter(date => date === publishRender)
        let res = data.filter(it => it.pubDate.includes(publishRender));
        setData(res);
        setIsTrue(true);
        console.log("publish", res);
    }

    const onReset = () => {
        setIsTrue(false);
    }

    return (
        <div>
            <label>
            <input
              type="radio"
              value="Source_Id"
              onChange={onChange}
              checked= {filtervalue === "Source_Id"}
            />
            Source_Id
             </label>
             <br />
             <label>
            <input
              type="radio"
              value="publishDate"
              onChange={onChange}
              checked= {filtervalue === "publishDate"}
            />
            publishDate
             </label>
            <br />
            {filtervalue === "Source_Id" ? <select onClick={onhandleId}>
            {optionItems}</select>
             : null}
                    
            {filtervalue === "publishDate" ? <select onClick={onhandlePublish}> 
            {publishItems}
            </select>
             : null}
            {filtervalue === "Source_Id" ? 
            <button onClick={onhandleFilter}>Filter</button>
             : null}
             {filtervalue === "publishDate" ? 
            <button onClick={onhandleDate}>Filter</button>
             : null}
              <button onClick={onReset}>Reset</button>
        
        {isTrue ? data.map(({ title,description })=> (
                <SortDisplay 
                title={title} description={description}/> 
            )): null}
           

        </div>
    )
}
export default Filter;