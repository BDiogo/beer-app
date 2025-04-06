import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Brewery } from "../../brewery/interface/brewery";

export class BreweryThunk {
  static fetchBrewerys = createAsyncThunk("brewerys/fetch", async () => {
    const response = await axios.get(`/api/brewery`);
    return response.data;
  });

  static createeBrewerys = createAsyncThunk(
    "brewery/create",
    async (brewery: Brewery, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `/api/brewery/${brewery?.id}`,
          brewery
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
}
