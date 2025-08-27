import { addMonths, getMonth, getYear, addWeeks } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { CreateScheduleModal } from "./CreateScheduleModal";
import { Schedule } from "@/app/types/calendar";
import { logout } from "@/app/actions/logout";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type HeaderProps = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  addSchedule: (schedule: Schedule) => void;
  setIsWeekView: Dispatch<SetStateAction<boolean>>;
  isWeekView: boolean;
};

export const Header = ({
  currentDate,
  setCurrentDate,
  addSchedule,
  isWeekView,
  setIsWeekView,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const changePrevPeriod = () => {
    if (isWeekView) {
      setCurrentDate((prevDate) => addWeeks(prevDate, -1));
    } else {
      setCurrentDate((prevDate) => addMonths(prevDate, -1));
    }
  };

  const changeNextPeriod = () => {
    if (isWeekView) {
      setCurrentDate((prevDate) => addWeeks(prevDate, 1));
    } else {
      setCurrentDate((prevDate) => addMonths(prevDate, 1));
    }
  };

  const actionLogout = async () => {
    const result = await logout();

    if (result.success) {
      toast.success(result.message);

      setTimeout(() => {
        redirect("/user/login");
      }, 1500);
    } else {
      toast.error(result.message);
    }
  };

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
            onClick={changePrevPeriod}
          >
            ←
          </button>
          <span>
            {`${getYear(currentDate)}年${getMonth(currentDate) + 1}月`}
          </span>
          <button
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-colors duration-500 hover:bg-purple-100"
            onClick={changeNextPeriod}
          >
            →
          </button>
        </div>
        <button
          className="rounded-lg bg-white px-4 py-2 text-purple-600 shadow-sm transition-colors duration-500 hover:bg-purple-50"
          onClick={() => setIsOpen(true)}
        >
          予定作成
        </button>
        <CreateScheduleModal
          isOpen={isOpen}
          closeModal={closeModal}
          addSchedule={addSchedule}
        />
        <button
          className="rounded-lg bg-white px-4 py-2 text-purple-600 shadow-sm transition-colors duration-500 hover:bg-purple-50"
          onClick={() => setIsWeekView(!isWeekView)}
        >
          月 ⇔ 週
        </button>
        <button
          className="rounded-lg bg-gray-300 px-4 py-2 text-black shadow-sm  hover:bg-gray-200"
          onClick={actionLogout}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
};
