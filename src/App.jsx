import { useEffect, useState } from "react";

import { DNA } from "react-loader-spinner";
import { fetchArticlesWithTopic } from "./articles-api";
import ArticleList from "./ArticleList/ArticleList";
import SearchForm from "./SearchForm/SearchForm";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const articlesData = await fetchArticlesWithTopic("react");
  //       setArticles(articlesData);
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && (
        <p>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          Loading data, please wait...
        </p>
      )}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}
