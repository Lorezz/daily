import { useState, useEffect, useMemo } from 'react';
import { ClockIcon } from '@heroicons/react/solid';
import { getDays, getMonth, getYear, isSameDay } from '~/lib/utils';
import CalendarHeader from './CalendarHeader';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar({ eventList }) {
  const days = getDays();
  // console.log('days', days);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setSelectedDay(days.find((day) => isSelected(day)));
  }, []);

  const month = getMonth();
  const year = getYear();

  function eventsOf(date) {
    if (!date) return [];
    return eventList?.filter((event) => isSameDay(date, event.datetime)) || [];
  }
  function isSelected(day) {
    return selectedDay?.date === day.date;
  }

  const selectedDayEvents = useMemo(() => {
    return selectedDay ? eventsOf(selectedDay.date) : [];
  }, [selectedDay]);

  console.log('selectedDay', selectedDay);
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader month={month} year={year} />
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => {
              const dayEvents = eventsOf(day.date);
              return (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? 'bg-white'
                      : 'bg-gray-50 text-gray-500',
                    'relative py-2 px-3'
                  )}
                >
                  <time
                    onClick={() => setSelectedDay(day)}
                    dateTime={day.date}
                    className={classNames(
                      'flex h-6 w-6 items-center justify-center rounded-full',
                      day.isToday && 'bg-indigo-600  font-semibold text-white',
                      isSelected(day) &&
                        !day.isToday &&
                        'bg-gray-900  font-semibold text-white'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  {dayEvents.length > 0 && (
                    <ol className="mt-2">
                      {dayEvents.slice(0, 2).map((event) => (
                        <li key={event.id}>
                          <a href={event.href} className="group flex">
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {event.time}
                            </time>
                          </a>
                        </li>
                      ))}
                      {dayEvents.length > 2 && (
                        <li className="text-gray-500">
                          + {dayEvents.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => {
              const dayEvents = eventsOf(day?.date);
              return (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (isSelected(day) || day.isToday) && 'font-semibold',
                    isSelected(day) && 'text-white',
                    !isSelected(day) && day.isToday && 'text-indigo-600',
                    !isSelected(day) &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-900',
                    !isSelected(day) &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-500',
                    'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      isSelected(day) &&
                        'flex h-6 w-6 items-center justify-center rounded-full',
                      isSelected(day) && day.isToday && 'bg-indigo-600',
                      isSelected(day) && !day.isToday && 'bg-gray-900',
                      'ml-auto'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  <span className="sr-only">{dayEvents?.length} events</span>
                  {dayEvents?.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {dayEvents.map((event) => (
                        <span
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {selectedDayEvents?.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDayEvents.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
