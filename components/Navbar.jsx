import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateTweet from "@app/create-tweet/page";
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
        <Sheet>
          <SheetTrigger>
            <button className="flex items-center justify-center">
              <AiOutlineUpload fontSize={25} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="w-full h-auto dark:bg-[#121212] rounded-t-3xl border-t border-gray-200 dark:border-none"
          >
            <SheetHeader>
              <SheetTitle className="mb-2 font-medium">New thread</SheetTitle>
              <SheetDescription>
                <CreateTweet />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
