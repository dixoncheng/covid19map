import readExcel from "../data/readExcel";

const ReadExcel = (data) => {
  console.log(data);

  return <div>Read Excel</div>;
};
export default ReadExcel;

export async function getStaticProps(context) {
  const data = await readExcel();
  return {
    props: {
      data,
    },
  };
}
