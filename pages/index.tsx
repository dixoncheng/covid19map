import Head from "next/head";
import MapView from "components/MapView";
import useSWR from "swr";
import fetch from "unfetch";

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const url = `${process.env.API}/main.json`;
  const { data, error } = useSWR(url, fetcher, { revalidateOnMount: true });

  const newsUrl = `${process.env.API}/news.json`;
  const { data: news } = useSWR(newsUrl, fetcher, { revalidateOnMount: true, refreshInterval: 30000 });

  return (
    <div className="container">
      <Head>
        <title>
          Covid-19 Map New Zealand - A visual look at the current Covid-19 cases
          in New Zealand
        </title>
      </Head>
      <MapView data={data} news={news} error={error} />
    </div>
  );
};

export default Home;
