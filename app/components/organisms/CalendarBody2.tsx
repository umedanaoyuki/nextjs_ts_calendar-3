import { useState } from "react";
import { Schedule, DateList } from "../../types/calendar";
import { cn } from "@/lib/utils";

const events = {
  5: [
    { title: "会議", time: "10:00", color: "blue" },
    { title: "ランチミーティング", time: "12:30", color: "green" },
  ],
  12: [{ title: "プレゼン", time: "14:00", color: "purple" }],
  15: [
    { title: "貸切", time: "終日", color: "red" },
    { title: "歓迎会", time: "10:00", color: "orange" },
  ],
  20: [{ title: "研修", time: "13:00", color: "indigo" }],
};

type PropsType = {
  currentDate: Date;
  dateList: DateList;
  setDateList: (dateList: DateList) => void;
  deleteSchedule: (schedule: Schedule) => void;
  changeSchedule: (
    originalSchedule: Schedule | null,
    selectedSchedule: Schedule
  ) => void;
};

export const CalendarBody2 = ({
  currentDate,
  dateList,
  deleteSchedule,
  changeSchedule,
}: PropsType) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  // 編集ボタンの表示について（初期は編集モードではない）
  const [isEditting, setIsEditting] = useState<boolean>(false);

  const closeModal = () => {
    setSelectedSchedule(null);
    setIsEditting(false);
  };

  const handleIsEdittingChange = (isEditting: boolean) => {
    setIsEditting(!isEditting);
  };

  console.log({ dateList });

  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const today = new Date();
  const todayDate = today.getDate();
  return (
    <>
      {days.map((day) => {
        return (
          <div
            key={day}
            className={cn(
              "flex flex-col items-center border-r border-b border-solid border-gray-100 p-0 pt-1 sm:items-start sm:p-2 sm:pt-2",
              day > 31 ? "bg-gray-50/50" : "bg-white",
              todayDate === day && "ring-2 ring-purple-400 ring-inset"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base",
                todayDate === day && "bg-purple-100 font-bold text-purple-600"
              )}
            >
              {day <= 31 ? day : day - 31}
            </span>
            <div className="flex w-full flex-col gap-1">
              {events[day as keyof typeof events]?.map((event, index) => {
                return (
                  <div
                    key={index}
                    className={cn("flex gap-1 rounded-md p-1 text-xs", {
                      "bg-blue-100 text-blue-700": event.color === "blue",
                      "bg-green-100 text-green-700": event.color === "green",
                      "bg-purple-100 text-purple-700": event.color === "purple",
                      "bg-red-100 text-red-700": event.color === "red",
                      "bg-orange-100 text-orange-700": event.color === "orange",
                      "bg-indigo-100 text-indigo-700": event.color === "indigo",
                    })}
                  >
                    <span className="hidden sm:inline">{event.time}</span>
                    <span className="hidden truncate sm:inline">
                      {event.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
