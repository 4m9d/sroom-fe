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
    <div className='relative flex w-full h-[90%] md:h-[80%] lg:h-[65%] justify-evenly'>
      {selectedWeek?.map((day, index) => {
        return (
          <DayCard
            selectedDay={selectedDay}
            key={day.fullDate + index}
            weekday={index.toString() as weekdayKey}
            date={day.date}
            hasValue={day.learningHistory !== undefined}
            dayCardClickHandler={dayCardClickHandler}
          />
        );
      })}
    </div>
  );
}
