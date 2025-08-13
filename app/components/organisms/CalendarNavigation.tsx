import { Schedule } from "@/app/types/calendar";
import { addMonths } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

type PropsType = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  addSchedule: (schedule: Schedule) => void;
};

export const CalendarNavigation = ({
  setCurrentDate,
  addSchedule,
}: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const changeToday = () => {
    console.log("changeToday");
    setCurrentDate(new Date());
  };

  const changePrevMonth = () =>
    setCurrentDate((prevDate) => addMonths(prevDate, -1));
  const changeNextMonth = () =>
    setCurrentDate((prevDate) => addMonths(prevDate, 1));

  return (
    <header className="flex flex-col justify-between gap-4 bg-white p-4 sm:flex-row">
      <div className="flex items-center justify-between gap-4">
        <button
          className="rounded-lg bg-white px-4 py-2 text-purple-600 shadow-sm transition-colors duration-500 hover:bg-purple-50"
          onClick={changeToday}
        >
          今日
        </button>
        <div className="flex items-center rounded-lg px-4 py-2 shadow-sm">
          <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-colors duration-500 hover:bg-purple-100">
            ←
          </button>
          <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-colors duration-500 hover:bg-purple-100">
            →
          </button>
          <span>2024年3月</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p>予定作成</p>
        <p>テストユーザー</p>
        <p>ログアウト</p>
      </div>
    </header>
  );
};
