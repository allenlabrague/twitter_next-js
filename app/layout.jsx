import "./globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Threads Clone",
  description: "Discover and Share Threads Clone",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/threads.svg" sizes="any" />
      </head>
      <body className={`${poppins.className} dark:bg-[#121212]`}>
        <Provider>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
