import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EventList from "../../../components/events/event-list";
function EventDate() {
  const router = useRouter();
  const filterData = router.query.slug; //runs after the component was run for the first time, so that first time the component render we don't have access to that URL data yet.

  if (!filterData) {
    <p className="center">Loading</p>;
  }
  //when it rendered for the second time we do have access to the data, and now we want to look for appropriate events.

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  //the data we get in string format, we need numbers
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter.Please adjust your values </p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter</p>;
  }
  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}
export default EventDate;

/*
- need to extract dynamic segment values
- need to extract the year and the month
- find the events that meet this year and month 
*/
