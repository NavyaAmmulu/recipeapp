function CuisineFilter({ selectedCuisine, setSelectedCuisine }) {
  return (
    <div className="filter-box">
      <h3>Cuisine</h3>
      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
      >
        <option value="">All</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="Italian">Italian</option>
      </select>
    </div>
  );
}

export default CuisineFilter;
