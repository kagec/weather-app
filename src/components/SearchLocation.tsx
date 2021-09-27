import { useState } from "react";

const SearchLocation = () => {
  const [location, setLocation] = useState<string>("");

  return (
    <form>
      <input
        type="text"
        placeholder="search location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchLocation;
