import { cn } from "@/lib/utils";

export const CalendarHeader = () => {
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  return (
    <>
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
    </>
  );
};
