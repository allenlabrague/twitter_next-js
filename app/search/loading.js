import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  const numberOfItems = 10;

  <div className="ml-4">
    {Array.from({ length: numberOfItems }).map((_, index) => (
      <div key={index} className="flex w-full p-4 transition-all">
        <div className="w-full">
          <div className="flex relative">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex gap-4 justify-between w-full">
              <div className="ml-[4rem] w-full">
                <div className="flex items-center w-full justify-between">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>;
}
