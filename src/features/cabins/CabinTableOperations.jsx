import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Price ascending" },
          { value: "regularPrice-desc", label: "Price descending" },
          { value: "maxCapacity-asc", label: "Capacity ascending" },
          { value: "maxCapacity-desc", label: "Capacity descending" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
