import Calendar from '~/components/Calendar';

export default function Index() {
  const eventsOfPeriod = [
    {
      id: 0,
      name: 'HAHAHA',
      time: '07AM',
      datetime: '2022-06-29T07:00',
      href: '#',
    },
    {
      id: 1,
      name: 'Design review',
      time: '10AM',
      datetime: '2022-07-03T10:00',
      href: '#',
    },
    {
      id: 2,
      name: 'Sales meeting',
      time: '2PM',
      datetime: '2022-07-03T14:00',
      href: '#',
    },
    {
      id: 3,
      name: 'Date night',
      time: '6PM',
      datetime: '2022-07-08T18:00',
      href: '#',
    },
    {
      id: 4,
      name: 'Maple syrup museum',
      time: '3PM',
      datetime: '2022-07-22T15:00',
      href: '#',
    },
    {
      id: 5,
      name: 'Hockey game',
      time: '7PM',
      datetime: '2022-07-22T19:00',
      href: '#',
    },
    {
      id: 6,
      name: "Sam's birthday party",
      time: '2PM',
      datetime: '2022-07-25T14:00',
      href: '#',
    },
    {
      id: 7,
      name: 'Cinema with friends',
      time: '9PM',
      datetime: '2022-07-04T21:00',
      href: '#',
    },
    {
      id: 9,
      name: 'HEHEHE',
      time: '07AM',
      datetime: '2022-08-02T07:00',
      href: '#',
    },
  ];
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1 className="text-3xl font-bold">Welcome to Remix</h1>
      <Calendar eventList={eventsOfPeriod} />
    </div>
  );
}
