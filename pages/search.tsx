import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, use, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {

  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // to prevent page from refreshing when submit
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if(searchQuery) {
      try {

        setSearchResults(null);
        setSearchResultsLoadingIsError(false)
        setSearchResultsLoading(true);
        const response = await fetch(`/api/search-news?q=${searchQuery}`);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);

      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false)
      }
    }

  }
  

  return (
    <>
    <Head>
      <title key="title">Search News - NextJS News App</title>
    </Head>
    <main>
      <h1>
        Search News
      </h1>
      <Alert>
        This pages uses...
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            name="searchQuery"
            placeholder="E.g. politics, sports, ..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border"/>}
        {searchResultsLoadingIsError && <p>Something went wrong. Please try again</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query</p>}
        {searchResults && <NewsArticleGrid articles={searchResults} />}
      </div>
    </main>
    </>
  );
}

export default SearchNewsPage;