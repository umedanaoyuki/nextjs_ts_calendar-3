"use client";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { DateList, Schedule } from "./types/calendar";
import { getScheduleList } from "./api/calendar";
import { useCalendar } from "./hooks/useCalendar";
import { CalendarHeader } from "./components/organisms/CalendarHeader";
import { CalendarBody } from "./components/organisms/CalendarBody";
import { Header } from "./components/organisms/Header";

const CalendarPage = () => {
  const [isWeekView, setIsWeekView] = useState(true);
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
    let newDateList: DateList;

    if (isWeekView) {
      // 週表示: 現在の週のみを表示
      const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // 日曜日開始
      const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: currentWeekEnd,
      });

      newDateList = [
        weekDays.map((date) => ({
          date,
          schedules: allSchedules.filter((sch) => isSameDay(sch.date, date)),
        })),
      ];
    } else {
      // 月表示: 月全体を表示
      const monthOfSundayList = eachWeekOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
      });

      newDateList = monthOfSundayList.map((date) => {
        return eachDayOfInterval({
          start: date,
          end: endOfWeek(date),
        }).map((date) => ({
          date,
          schedules: allSchedules.filter((sch) => isSameDay(sch.date, date)),
        }));
      });
    }

    setDateList(newDateList);
  }, [currentDate, allSchedules, isWeekView]);

  return (
    <div className="flex h-screen flex-col bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setIsWeekView={setIsWeekView}
        addSchedule={addSchedule}
        isWeekView={isWeekView}
      />
      <div className="mx-0.5 my-2 grid flex-1 grid-cols-7 overflow-hidden rounded-2xl bg-white shadow-xl sm:m-4">
        <CalendarHeader isWeekView={isWeekView} />
        <CalendarBody
          currentDate={currentDate}
          dateList={dateList}
          deleteSchedule={deleteSchedule}
          changeSchedule={changeSchedule}
          isWeekView={isWeekView}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
