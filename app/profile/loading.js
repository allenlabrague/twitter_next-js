import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  const numberOfItems = 10;
  return (
    <>
      <section className="h-screen flex-center flex-col">
        <div className="p-4 bg-white dark:bg-[#121212]">
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div>
          <div className="p-4 flex items-center justify-between w-full">
            <div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-3 px-4 my-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="p-2 pt-4 flex items-center justify-center mx-4">
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex flex-col-reverse">
          <div className=" ml-4">
            {Array.from({ length: numberOfItems }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 mt-8">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
