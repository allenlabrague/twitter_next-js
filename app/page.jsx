import Feed from "@components/Feed";
import Image from "next/image";
import { useTheme } from "next-themes";

const Home = () => {
  const { theme, setTheme } = useTheme();
  return (
    <section>
      <div className="flex items-center justify-center w-full p-4 bg-white dark:bg-[#121212]">
        {theme === "dark" ? (
          <Image
            src="/threadswhite.svg"
            width={25}
            height={25}
            alt="threads-icon"
          />
        ) : (
          <Image
            src="/threadsblack.svg"
            width={25}
            height={25}
            alt="threads-icon"
          />
        )}
      </div>
      <div>
        <Feed />
      </div>
    </section>
  );
};

export default Home;
