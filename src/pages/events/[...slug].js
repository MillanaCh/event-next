import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/events/error-alert";
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
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter.Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
export default EventDate;

/*
- need to extract dynamic segment values
- need to extract the year and the month
- find the events that meet this year and month 
*/
