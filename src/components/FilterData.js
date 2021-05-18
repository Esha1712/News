import axios from 'axios';
 import React, { Component } from 'react';  
 class FilterData extends Component {
     state = { 
         value : "author", 
          results: {}, 
        }; 
        fetchSearchResults = async (q) => {
             const res = await axios.get('https://newsdata.io/api/1/news?apikey=pub_177e9db72356919775d6af8a9a99d47927c&q=social').then(res => console.log("res",res)) 
             }; 
             onChange = e => {
                  this.setState({value: e.target.value}); 
             } 
             render() {
                  const {value} = this.state;
                  return(
                       <form> 
                           <h1>Current value: {value}</h1>
                           <label> 
                               Author
                               <input type="radio" checked= {value==="author"} value ="author" onChange = {this.onChange} />
                                </label>
                                <label> 
                                    Published 
                                     <input type="radio" checked={value==="publishDate"} value ="publishDate" onChange = {this.onChange} />
                                     </label> 
                                     </form> 
                                     ) 
                                    }} 
 export default FilterData;