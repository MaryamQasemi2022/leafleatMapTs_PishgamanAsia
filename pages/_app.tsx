import Header from "@/components/Header/Header";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import axios from "axios";
import https from "https";
import { AuthProvider } from "@/contexts/AuthContext";
if (process.env.NODE_ENV === "development") {
  axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
}
const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("bootstrap");
  }, []);

  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
