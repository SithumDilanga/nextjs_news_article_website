import Head from 'next/head';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { NewsArticle } from '@/models/NewsArticles'
import { NewsResponse } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticleGrid from '@/components/NewsArticleGrid'
import { Alert } from 'react-bootstrap'

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);

  const newsResponse: NewsResponse = await response.json();

  return {
    props: {newsArticles: newsResponse.articles}
  };

  // let error go to 500 page
}

export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key = "title">
          Breaking News - NextJS News App
        </title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch the data server-side on every request. This allows search engines to crawl the page content and <strong>improves SEO</strong>
        </Alert>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  )
}
