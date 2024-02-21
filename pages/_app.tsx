import Header from "@/components/Header/Header";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
