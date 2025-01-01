import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Date descending" },
          { value: "startDate-asc", label: "Date ascending" },
          {
            value: "totalPrice-desc",
            label: "Amount descending",
          },
          { value: "totalPrice-asc", label: "Amount ascending" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
