import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GetServerSidePropsContext } from 'next'
import { setCookie, getCookie } from 'cookies-next';
import { useState, useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {

  const [darkmode, setDarkmode] = useState(false);
  const [waitForDraw, setWaitForDraw] = useState(true);

  useEffect(() => {
    const cookie = getCookie('reader')
    if (cookie) {
      const reader = JSON.parse(cookie as string);
      if (reader.mode) {
        if (reader.mode === "dark") {
          setDarkmode(true);// matches const [darkmode, setDarkmode] = useState(true);
          document?.querySelector("body")?.classList.remove("light");
          document?.querySelector("body")?.classList.add("dark");
        } else {
          document?.querySelector("body")?.classList.remove("dark");
          document?.querySelector("body")?.classList.add("light");
        }
        setWaitForDraw(false);
      }
    } else {
      setDarkmode(false);
      setWaitForDraw(false);
    }
  }, []);

  const darkModeSwitch = (event: React.FormEvent<HTMLInputElement>) => {
    setDarkmode(!darkmode);
    try {
      var date = new Date();
      date.setFullYear(date.getFullYear() + 6);
      const data = { mode: darkmode ? "light" : "dark" }
      setCookie("reader", JSON.stringify(data), {
        path: "/",
        expires: date, // Expires after 6 years (year of jubilee)
        sameSite: "lax",
      });
      if (document) {
        if (darkmode) {
          document?.querySelector("body")?.classList.remove("dark");
          document?.querySelector("body")?.classList.add("light");
        } else {
          document?.querySelector("body")?.classList.remove("light");
          document?.querySelector("body")?.classList.add("dark");
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  pageProps.layout = {
    mode: darkmode,
    wait: waitForDraw,
    switch: darkModeSwitch
  }
  return <Component {...pageProps} />
}

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  /**
   * Yep, it's empty, but needed to force reading cookies and request
   * headers on server-side so _document can read it
   */
  return { props: {} };
};
