"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./store/authSlice";
import { getTokenFromLocalStorage } from "./utils/authHelpers";
import localFont from "next/font/local";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ReactQueryProvider } from "./lib/ReactQueryProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  function TokenInitializer() {
    const dispatch = useDispatch();
    useEffect(() => {
      const token = getTokenFromLocalStorage();
      if (token) {
        dispatch(setToken(token));
      }
    }, [dispatch]);

    return null;
  }
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <Provider store={store}>
            <TokenInitializer />
            <Header />
            {children}
            <Footer />
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
