"use client";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import { DateList, Schedule } from "./types/calendar";
import { getScheduleList } from "./api/calendar";
import { useCalendar } from "./hooks/useCalendar";
import { CalendarHeader2 } from "./components/organisms/CalendarHeader2";
import { CalendarBody2 } from "./components/organisms/CalendarBody2";
import { Header } from "./components/organisms/Header";

const CalendarPage = () => {
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

  // ここで日付のリストを作成する
  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });

    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({
        date,
        schedules: allSchedules.filter((sch) => isSameDay(sch.date, date)),
      }));
    });

    setDateList(newDateList);
  }, [currentDate, allSchedules]);

  return (
    <div className="flex h-screen flex-col bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        addSchedule={addSchedule}
      />
      <div className="mx-0.5 my-2 grid flex-1 grid-cols-7 overflow-hidden rounded-2xl bg-white shadow-xl sm:m-4">
        <CalendarHeader2 />
        <CalendarBody2
          currentDate={currentDate}
          dateList={dateList}
          deleteSchedule={deleteSchedule}
          changeSchedule={changeSchedule}
        />
        {/* {days.map((day) => {
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
        })} */}
      </div>
    </div>
  );
};

export default CalendarPage;
