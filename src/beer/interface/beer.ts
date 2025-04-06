import { Brewery } from "../../brewery/interface/brewery";

export interface Beer {
  abv: number;
  approved: boolean;
  breweryId: number;
  description: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image: string;
  name: string;
  srm: number;
  style: string;
  volume: number;
}
export interface BeerDetails extends Beer {
  brewery: Brewery;
}
