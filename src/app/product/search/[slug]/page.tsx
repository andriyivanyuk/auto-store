import Box from "@component/Box";
import SearchResult from "./SearchResult";

export default function ProductSearchResult() {
  return (
    <Box pt="20px">
      <SearchResult sortOptions={sortOptions} />
    </Box>
  );
}

const sortOptions = [
  { label: "Від низької до високої", value: "Від низької до високої" },
  { label: "Від високої до низької", value: "Від високої до низької" },
];
