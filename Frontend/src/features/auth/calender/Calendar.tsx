import { type Event as EventType } from './typs'; // תיקון הנתיב לפי מיקום הקובץ
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventsQuery } from './eventApi'; // תיקון נתיב
import { parseISO } from 'date-fns';
import moment from 'moment';

const localizer = momentLocalizer(moment);
// ודא ש־EventType מתאים למבנה הזה
interface CalendarEvent {
    _id: string;
    title: string;
    start: Date;
    end: Date;
  }
  
 
  
// טיפוס שמתאים ללוח שנה
// interface CalendarEvent {
//   _id: string;
//   title: string;
//   start: Date;
//   end: Date;
// }

export default function Calendar() {
  const { data: events = [] } = useGetEventsQuery();
  const transformedEvents: CalendarEvent[] = events.map((event: EventType) => ({
    _id: event._id,
    title: event.title,
    start: parseISO(event.start), // המרת מ-ISO ל-תאריך
    end: parseISO(event.end),     // המרת מ-ISO ל-תאריך
  }));
//   const transformedEvents: CalendarEvent[] = events.map((event: EventType) => ({
//     _id: event._id,
//     title: event.title,
//     start: parseISO(event.start),
//     end: parseISO(event.end),
//   }));

  return (
    <div style={{ height: '700px', margin: '2rem' }}>
      <BigCalendar
        localizer={localizer}
        events={transformedEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500 }}
      />
    </div>
  );
}
