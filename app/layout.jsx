import "@styles/globals.css";
import Navbar from "@components/Navbar";
import RightNavbar from "@components/RightNavbar";

import Provider from "@components/Provider";

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
      <body>
        <Provider>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
