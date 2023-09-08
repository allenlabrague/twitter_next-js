"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  if (session?.user) {
    router.push("/");
  }

  return (
    <>
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <nav className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-[#121212]">
              <div className="relative w-full h-screen">
                <Image
                  src="/bgThreads.svg"
                  fill
                  alt="threads"
                  className="absolute top-0 bottom-0 left-0 right-0 mx-auto"
                />
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="absolute bottom-24 z-10 left-0 right-0 mx-auto w-[90%] bg-white rounded-xl p-5 flex items-center justify-between shadow-xl dark:bg-[#2C2C2C]"
                >
                  <h2 className="text-black dark:text-white text-sm">
                    Continue with {provider.name}
                  </h2>
                  <Image
                    src="/google.svg"
                    width={30}
                    height={30}
                    alt="home-icon"
                  />
                </button>
              </div>
            </nav>
          ))}
      </>
    </>
  );
};

export default Home;
