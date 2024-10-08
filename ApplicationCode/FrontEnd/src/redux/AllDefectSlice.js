import { createSlice } from '@reduxjs/toolkit';

// Initial state with allDefects array
const initialState = {
  allDefects: [], // Store all defects
};

// Helper function to combine defects by station_name
const groupDefectsByStation = (defects) => {
  const stationMap = new Map();

  defects.forEach((defect) => {
    const { station_name } = defect;

    if (stationMap.has(station_name)) {
      // If the station already exists, just add the defect to the list
      stationMap.get(station_name).push(defect);
    } else {
      // Otherwise, create a new list for this station's defects
      stationMap.set(station_name, [defect]);
    }
  });

  // Return the grouped defects as an array of { station_name, defects }
  return Array.from(stationMap.entries()).map(([station_name, defects]) => ({
    station_name,
    defects,
  }));
};

// Create a slice
const allDefectsSlice = createSlice({
  name: 'allDefects',
  initialState,
  reducers: {
    // Action to set and group defects by station_name
    setAllDefects: (state, action) => {
      const groupedDefects = groupDefectsByStation(action.payload); // Combine defects by station_name
      state.allDefects = groupedDefects;
    },
    // Clear all defects
    clearAllDefects: (state) => {
      state.allDefects = [];
    },
  },
});

// Export the actions generated by createSlice
export const { setAllDefects, clearAllDefects } = allDefectsSlice.actions;

// Selector function to get all grouped defects
export const selectAllDefects = (state) => {
  console.log(state.allDefects.allDefects)
  return state.allDefects.allDefects || [];
};

// Export the reducer generated by createSlice
export default allDefectsSlice.reducer;
