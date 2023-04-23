import "../styles/globals.css";

export default function App({
  //@ts-ignore
  Component,
  //@ts-ignore
  pageProps,
}) {
  return <Component {...pageProps} />;
}
