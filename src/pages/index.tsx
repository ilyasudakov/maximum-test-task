import Head from "next/head";
import styles from "../styles/Home.module.css";
import { CarType, getCarsByBrand } from "../utils/API/carBrands";
import CarList, { CAR_BRANDS } from "../widgets/CarList";

const Home = ({ list }: PageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Maximum</title>
        <meta name="description" content="Maximum тестовое задание" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CarList list={list} />
    </div>
  );
};

export default Home;

export type PageProps = { list: { [brand in string]: CarType[] } };

export async function getServerSideProps() {
  let list: PageProps["list"] = {};

  await Promise.all(
    CAR_BRANDS.map(async (brand) => {
      const data = await getCarsByBrand(brand);
      list[brand] = data.list;
      return;
    })
  );

  return {
    props: {
      list,
    },
  };
}
