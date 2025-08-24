import { addMonths, getMonth, getYear } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export const Header = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}) => {
  const changePrevMonth = () =>
    setCurrentDate((prevDate) => addMonths(prevDate, -1));
  const changeNextMonth = () =>
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  return (
    <header className="flex flex-col justify-between gap-4 bg-white p-4 sm:flex-row">
      <h1 className="bg-linear-to-br from-purple-600 to-pink-600 bg-clip-text text-center text-3xl font-bold text-transparent">
        カレンダー
      </h1>
      <div className="flex items-center justify-center gap-4">
        <button
          className="rounded-lg bg-white px-4 py-2 text-purple-600 shadow-sm transition-colors duration-500 hover:bg-purple-50"
          onClick={() => setCurrentDate(new Date())}
        >
          今日
        </button>
        <div className="flex items-center rounded-lg px-4 py-2 shadow-sm">
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-colors duration-500 hover:bg-purple-100"
            onClick={changePrevMonth}
          >
            ←
          </button>
          <span>{`${getYear(currentDate)}年${
            getMonth(currentDate) + 1
          }月`}</span>
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-colors duration-500 hover:bg-purple-100"
            onClick={changeNextMonth}
          >
            →
          </button>
        </div>
      </div>
    </header>
  );
};
