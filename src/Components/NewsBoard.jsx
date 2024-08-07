import { useEffect } from "react";
import { useState } from "react"
import NewsItem from "./NewsItem";


const NewsBoard = ({category}) => {

    const[articles,setArticles]=useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setArticles(data.articles || []);
        } catch (error) {
          console.error('Fetching data failed:', error);
        }
      };
    
      fetchData();
    }, [category]);
    

    return (
      <div>
        <h2 style={{ marginTop: '20px' }} className="text-center">
          Latest <span className="badge bg-danger">News</span>
        </h2>
        {articles && articles.length > 0 ? (
          articles.map((news, index) => (
            <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
          ))
        ) : (
          <p>No news articles available.</p>
        )}
      </div>
    );
}

export default NewsBoard
