import DayCard from "./DayCard";
import { weekdayKey } from ".";

export default function CalendarForOneWeek({
  selectedDay,
  selectedWeek,
  dayCardClickHandler
}: {
  selectedDay: weekdayKey;
  selectedWeek: WeekInfo[];
  dayCardClickHandler: (weekday: weekdayKey) => void;
}) {
  return (
    <div className='relative flex w-full min-h-12 max-h-28 h-[80%] justify-evenly'>
      {selectedWeek?.map((day, index) => {
        return (
          <DayCard
            selectedDay={selectedDay}
            key={day.fullDate + index}
            weekday={index.toString() as weekdayKey}
            fullDate={day.fullDate}
            date={day.date}
            hasValue={day.learningHistory !== undefined}
            dayCardClickHandler={dayCardClickHandler}
          />
        );
      })}
    </div>
  );
}
