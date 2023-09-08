import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUpload,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 flex items-center justify-around w-full bg-white z-10 dark:bg-[#121212]">
      <div className="flex items-center justify-around w-full p-5">
        <Link href="/">
          <AiOutlineHome fontSize={25} />
        </Link>
        <Link href="/search">
          <AiOutlineSearch fontSize={25} />
        </Link>
        <Link href="/create-tweet">
          <AiOutlineUpload fontSize={25} />
        </Link>
        <Link href="/activity">
          <AiOutlineHeart fontSize={25} />
        </Link>
        <Link href="/profile">
          <AiOutlineUser fontSize={25} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
