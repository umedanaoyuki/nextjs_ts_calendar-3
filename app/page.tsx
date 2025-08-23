"use client";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import { CalendarNav } from "./components/organisms/CalendarNav";
import { DateList, Schedule } from "./types/calendar";
import { getScheduleList } from "./api/calendar";
import { CalendarHeader } from "./components/organisms/CalendarHeader";
import { CalenderBody } from "./components/organisms/CalenderBody";
import { useCalendar } from "./hooks/useCalendar";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <h1 className="font-bold text-3xl mb-5 text-center">{`${
          getMonth(currentDate) + 1
        }月`}</h1>
        <CalendarNav
          setCurrentDate={setCurrentDate}
          addSchedule={addSchedule}
        />
        <div className="flex justify-center">
          <table className="w-full max-w-5xl border-collapse border-2 border-solid border-lime-800 table-fixed">
            <CalendarHeader />
            <CalenderBody
              currentDate={currentDate}
              dateList={dateList}
              setDateList={setDateList}
              deleteSchedule={deleteSchedule}
              changeSchedule={changeSchedule}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
