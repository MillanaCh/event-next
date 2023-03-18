import { getAllEvents } from "../../../dummy-data";

function AllEventsPage() {
    const events = getAllEvents()
  return (
    <div>
      <h1>Events Page</h1>
    </div>
  );
}
export default AllEventsPage;
