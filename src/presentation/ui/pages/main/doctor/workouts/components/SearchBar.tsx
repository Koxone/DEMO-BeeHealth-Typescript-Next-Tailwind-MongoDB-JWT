// Next, React and Other Libraries
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { useEffect, useMemo } from 'react';

// Enums, Types and Interfaces
import { WorkoutCategoryEnum } from '@/domain/enums/';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  allWorkoutsData,
  filterCategory,
  setFilteredWorkouts,
}) {
  // Memoize Fuse instance
  const fuse = useMemo(() => {
    if (!allWorkoutsData?.workouts) return null;

    return new Fuse(allWorkoutsData.workouts, {
      keys: ['name', 'type', 'difficulty', 'category'],
      threshold: 0.3,
    });
  }, [allWorkoutsData]);

  // Compute results
  const filteredWorkouts = useMemo(() => {
    if (!allWorkoutsData?.workouts) return [];

    const results =
      searchTerm && fuse ? fuse.search(searchTerm).map((r) => r.item) : allWorkoutsData.workouts;

    return results.filter(
      (e) => filterCategory === WorkoutCategoryEnum.ALL || e.category === filterCategory
    );
  }, [searchTerm, filterCategory, fuse, allWorkoutsData]);

  // Sync to parent
  useEffect(() => {
    setFilteredWorkouts(filteredWorkouts);
  }, [filteredWorkouts, setFilteredWorkouts]);

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          maxLength={250}
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 outline-none"
        />
      </div>
    </div>
  );
}
