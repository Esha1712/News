import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import Header from './Header';
import Filter from './Filter';
import Sort from './Sort';

const NewsList = () => {
    const [article, setArticle] = useState([0]);
    // // const KEY = 'pub_17183f1c188c28e0eb08a11fb0618608237,pub_1732a83aa4af60e25d7b8839e5a6a98856c'

    useEffect(() => {
        const getArticles = async () => {
            
            const res = await axios.get('https://newsdata.io/api/1/news?apikey=pub_177e9db72356919775d6af8a9a99d47927c&q=social',{
                
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":"X-Requested-With",
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Credentials": true,
                }
            })
            setArticle(res.data.results);
            console.log("Res",res.data.results);
        }
        getArticles();
    },[]);

    return (
        <div>
           
            <Header />
            <Filter />
            <Sort />
            {console.log("article",article)}
            {article.map(({title,description,link,image_url}) => (
            <NewsItem title={title} description={description} link={link} image_url={image_url} />
      ))}
           
            {/* {article.map(({ title, description, link, image_url }) => {
                
                // <NewsItem 
                // title={title}
                // description={description}
                // link={link}
                // image_url={image_url}
                // />
            })} */}
        </div>
    );
};
export default NewsList;