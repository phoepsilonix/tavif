export default function Null() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <span className="text-base font-bold text-gray-700 text-center">
        No result
        <br />
        Select images from INPUT tab <br />
        and convert them to see the result here.
      </span>
      <div className="w-full h-full overflow-hidden absolute top-0 left-0">
        <img
          src="/null.png"
          alt="null"
          className="w-[80%] opacity-[0.02] absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
