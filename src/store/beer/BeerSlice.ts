import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Beer } from "../../beer/interface/beer";
import { BeerThunk } from "./BeerThunk";
import { Brewery } from "../../brewery/interface/brewery";
import { BreweryThunk } from "./BreweryThunk";

export interface FilterState {
  srm: [number, number];
  ibu: [number, number];
  abv: [number, number];
  query?: string;
}

export interface StateConstants {
  srm: { r: number; g: number; b: number }[];
  srmRange: [number, number];
  ibu: { r: number; g: number; b: number }[];
  ibuRange: [number, number];
  abv: { r: number; g: number; b: number }[];
  abvRange: [number, number];
}

export interface State extends StateConstants {
  list: Beer[];
  brewery: Brewery[];
  loading: boolean;
  creating: boolean;
  error: string | null;
  filter: {
    srm: [number, number];
    ibu: [number, number];
    abv: [number, number];
  };
}

const initialState: State = {
  list: [],
  brewery: [],
  loading: false,
  creating: false,
  error: null,
  srm: [
    { r: 255, g: 230, b: 153 },
    { r: 110, g: 20, b: 0 },
  ],
  srmRange: [0, 75],
  ibu: [
    { r: 255, g: 255, b: 255 },
    { r: 144, g: 153, b: 35 },
  ],
  ibuRange: [0, 100],
  abv: [
    { r: 231, g: 228, b: 193 },
    { r: 209, g: 191, b: 81 },
  ],
  abvRange: [3, 20],
  filter: {
    srm: [0, 75],
    ibu: [0, 100],
    abv: [3, 20],
  },
};

const BeerSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filter = {
        srm: state.srmRange,
        ibu: state.ibuRange,
        abv: state.abvRange,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BeerThunk.fetchBeers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BeerThunk.fetchBeers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(BeerThunk.fetchBeers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch beers";
      })

      .addCase(BreweryThunk.fetchBrewerys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BreweryThunk.fetchBrewerys.fulfilled, (state, action) => {
        state.loading = false;
        state.brewery = action.payload;
      })
      .addCase(BreweryThunk.fetchBrewerys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch breweries";
      })

      .addCase(BeerThunk.createBeer.pending, (state) => {
        state.creating = true;
      })
      .addCase(BeerThunk.createBeer.fulfilled, (state, action) => {
        state.creating = false;
        state.list.push(action.payload);
      })
      .addCase(BeerThunk.createBeer.rejected, (state) => {
        state.creating = false;
      });
  },
});

export default BeerSlice.reducer;
export const { setFilter, resetFilters } = BeerSlice.actions;
