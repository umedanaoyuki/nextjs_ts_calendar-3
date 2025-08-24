import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DateList, Schedule } from "../../types/calendar";
import { getDate, isSameDay } from "date-fns";
import { ScheduleDetailsModal } from "./ScheduleDetailsModal";
interface CalendarBody2Props {
  currentDate: Date;
  dateList: DateList;
  deleteSchedule: (schedule: Schedule) => void;
  changeSchedule: (
    originalSchedule: Schedule | null,
    selectedSchedule: Schedule
  ) => void;
}

export const CalendarBody = ({
  currentDate,
  dateList,
  deleteSchedule,
  changeSchedule,
}: CalendarBody2Props) => {
  const today = new Date();

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

  return (
    <>
      {dateList.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((dayData, dayIndex) => {
            const isToday = isSameDay(dayData.date, today);
            const isCurrentMonth =
              dayData.date.getMonth() === currentDate.getMonth();

            return (
              <div
                key={dayIndex}
                className={cn(
                  "flex flex-col items-center border-r border-b border-solid border-gray-100 p-0 pt-1 sm:items-start sm:p-2 sm:pt-2",
                  !isCurrentMonth ? "bg-gray-50/50" : "bg-white",
                  isToday && "ring-2 ring-purple-400 ring-inset"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base",
                    isToday && "bg-purple-100 font-bold text-purple-600"
                  )}
                >
                  {getDate(dayData.date)}
                </span>
                <div className="flex w-full flex-col gap-1">
                  {dayData.schedules.map((schedule, index) => {
                    return (
                      <div
                        key={schedule.id}
                        className="flex gap-1 rounded-md bg-blue-100 p-1 text-xs text-blue-700"
                      >
                        <button
                          key={schedule.id}
                          onClick={() => setSelectedSchedule(schedule)}
                          className="w-full"
                        >
                          <span className="hidden truncate sm:inline">
                            {schedule.title}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
      <ScheduleDetailsModal
        selectedSchedule={selectedSchedule}
        closeModal={closeModal}
        deleteSchedule={deleteSchedule}
        isEditting={isEditting}
        setSelectedSchedule={setSelectedSchedule}
        handleIsEdittingChange={handleIsEdittingChange}
        changeSchedule={changeSchedule}
      />
    </>
  );
};
