import { useContext } from 'react';
import { CalendarClock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const daysOfWeek = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];


const convertTo12Hour = (time24) => {
  if (!time24) return "00:00 AM";
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert "0" to "12"
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const capitalizeFirstLetter = str =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";


const GymTiming = () => {
  const { savedSchedule } = useContext(AuthContext);

  return (
    <div className="shadow-xl shadow-white/10 rounded-xl sm:p-6 p-4 max-sm:text-sm sm:mx-auto border border-white/10 my-28 mx-2">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-4xl sm:text-6xl font-semibold flex items-center gap-2">
          <div className='p-3 bg-white/10 rounded-full'>
            <CalendarClock className="w-5 h-5" />
          </div>
          Gym Schedule (24h)
        </h2>
      </div>

      <div className="space-y-4 text-gray-300">

        {daysOfWeek.map((day) => (
          <div key={day} className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <p className="sm:w-28 font-semibold">{capitalizeFirstLetter(day)}</p>
            {
              Object.keys(savedSchedule).length > 0 && savedSchedule[day]
                ? <p>{convertTo12Hour(savedSchedule[day].open)} to {convertTo12Hour(savedSchedule[day].close)} {savedSchedule[day].isClosed && <span className='text-red-700 bg-red-800/20 py-1 px-3 rounded-full'>Closed</span>}</p>
                : <p>00:00 to 00:00</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymTiming;
