"use client";
import { cn } from "@/app/libs/utils";
import React, { useState } from "react";
import { useCalendar } from "../hooks/useCalendar";
import { DateList, Schedule } from "../types/calendar";
import { getScheduleList } from "../api/calendar";
import { CalendarNavigation } from "../components/organisms/CalendarNavigation";

const CalendarPage = () => {
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [allSchedules, setAllSchedules] = useState<Schedule[]>(() =>
    getScheduleList()
  );
  const [dateList, setDateList] = useState<DateList>([]);
  const { addSchedule, deleteSchedule, changeSchedule } = useCalendar({
    currentDate: currentDate,
    dateList,
    setDateList,
    setAllSchedules,
  });

  const today = new Date();
  const todayDate = today.getDate();

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

  return (
    <>
      <div className="flex h-screen flex-col bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
        <CalendarNavigation
          setCurrentDate={setCurrentDate}
          addSchedule={addSchedule}
          currentDate={currentDate}
        />
        <div className="mx-0.5 my-2 grid flex-1 grid-cols-7 overflow-hidden rounded-2xl bg-white shadow-xl sm:m-4">
          {weekDays.map((day, i) => {
            return (
              <div
                key={day}
                className={cn(
                  "border-b border-solid border-gray-200 bg-gray-50/80 text-center",
                  i === 0 && "text-red-500",
                  i === 6 && "text-blue-500",
                  i !== 0 && i !== 6 && "text-gray-700"
                )}
              >
                {day}
              </div>
            );
          })}
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
                    todayDate === day &&
                      "bg-purple-100 font-bold text-purple-600"
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
                          "bg-green-100 text-green-700":
                            event.color === "green",
                          "bg-purple-100 text-purple-700":
                            event.color === "purple",
                          "bg-red-100 text-red-700": event.color === "red",
                          "bg-orange-100 text-orange-700":
                            event.color === "orange",
                          "bg-indigo-100 text-indigo-700":
                            event.color === "indigo",
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
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
