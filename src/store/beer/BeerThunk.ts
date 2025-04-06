import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateBeerFields } from "../../utils/FormValidation";

export class BeerThunk {
  static fetchBeers = createAsyncThunk("beers/fetch", async () => {
    const response = await axios.get(`/api/beer`);
    return response.data;
  });

  static createBeer = createAsyncThunk(
    "beers/create",
    async (beer: CreateBeerFields, { rejectWithValue }) => {
      try {
        const formattedData = {
          ...beer,
          food_pairing: beer.food_pairing?.map((pairing) => pairing.value),
        };

        const response = await axios.post(`/api/beer/create`, formattedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
}
