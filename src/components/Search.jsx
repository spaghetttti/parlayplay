export function Search({ searchTerm, handleSearchTermChange }) {
  return (
    <form className="flex w-full items-center justify-center gap-6">
      <label>Search a team</label>
      <input
        className="border-2 rounded border-teal-700 focus:border-teal-900"
        name="searchTerm"
        type="text"
        onChange={handleSearchTermChange}
      />
    </form>
  );
}
