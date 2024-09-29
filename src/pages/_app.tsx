// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; // グローバルスタイルの読み込み
import Header from "src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
