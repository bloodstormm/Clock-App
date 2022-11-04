export const Skeleton = () => (
  <section
    className="container relative mx-auto mt-14 
  mb-8 flex flex-col justify-between xl:h-[85%] xl:max-w-7xl 2xl:h-4/5"
  >
    <div className="flex flex-col items-end justify-end space-y-2 2xl:space-y-12">
      <div className="flex h-10 w-28 animate-pulse justify-end rounded-lg bg-gray-200"></div>
      <div className="w-full">
        <div className="h-20 w-[28rem] animate-pulse rounded-lg bg-gray-200"></div>
        <div className="mt-8 h-8 w-44 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </div>

    <div className="clockContainer flex items-end justify-between text-almostWhite">
      <div className="mt-8 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-10 w-[20rem] animate-pulse rounded-lg bg-gray-200"></div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="h-28 w-[26rem]  animate-pulse rounded-lg bg-gray-200 2xl:h-60 2xl:w-[38rem]"></div>
          <div className="ml-3 mt-14 h-12 w-28 animate-pulse rounded-lg bg-gray-200"></div>
        </div>

        <div className="mt-8">
          <div className="h-8 w-60 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>

      <div className="h-14 w-36 animate-pulse rounded-full bg-gray-200"></div>
    </div>
  </section>
);
