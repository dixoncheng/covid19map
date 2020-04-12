import Head from "next/head";
import MapView from "../components/MapView";
import useSWR from "swr";
const fetch = require("node-fetch");

const Home = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("http://localhost:5000/main.json", fetcher);

  if (error) return <div />;
  if (!data) return <div />;

  // let data;
  // data = fetch("http://localhost:5000/main.json").then((r) => r.json());
  // console.log(data);
  // if (!data) {
  //   return "loading";
  // }

  return (
    <div className="container">
      <Head>
        <title>Covid 19 Map NZ</title>
      </Head>
      <MapView data={data} onViewChange={() => setView("stats")} />
    </div>
  );
};

export default Home;
