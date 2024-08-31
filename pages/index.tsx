import { GetServerSideProps, NextPage } from "next";

import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  console.log(initialImageUrl);
  //初期画像はSSR で用意したので初期画面のuseEffectは不要
  //   useEffect(() => {
  //     fetchImege().then((newImage) => {
  //       setImageUrl(newImage.url);
  //       setLoading(false);
  //     });
  //   }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImege();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        更新
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImege();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImege = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
