import { Beer, BeerDetails } from "../../beer/interface/beer";
import { Brewery } from "../../brewery/interface/brewery";
import { RootState } from "../store";
import { StateConstants } from "./BeerSlice";

export class BeerSelector {
  static selectConstants(state: RootState): StateConstants {
    return {
      srm: state.beers.srm,
      srmRange: state.beers.srmRange,
      ibu: state.beers.ibu,
      ibuRange: state.beers.ibuRange,
      abv: state.beers.abv,
      abvRange: state.beers.abvRange,
    };
  }

  static selectAll(state: RootState): Beer[] {
    return state.beers.list;
  }

  static selectBrewery(state: RootState): Brewery[] {
    return state.beers.brewery;
  }

  static selectById(
    state: RootState,
    id: string | undefined
  ): BeerDetails | undefined {
    if (!id) {
      return;
    }
    const beer = state.beers.list.find((beer) => beer.id === parseInt(id));
    if (beer) {
      const brewery = state.beers.brewery.find((b) => b.id === beer.breweryId);

      return { ...beer, brewery } as BeerDetails;
    }
    return;
  }

  static selectFilter(state: RootState): {
    srm: [number, number];
    ibu: [number, number];
    abv: [number, number];
  } {
    return { ...state.beers.filter };
  }

  static selectFiltered(state: RootState): Beer[] {
    return state.beers.list?.filter(
      (beer) =>
        (!state.beers.filter.abv ||
          (beer.abv < state.beers.filter.abv[1] &&
            beer.abv > state.beers.filter.abv[0])) &&
        (!state.beers.filter.srm ||
          (beer.srm < state.beers.filter.srm[1] &&
            beer.srm > state.beers.filter.srm[0])) &&
        (!state.beers.filter.ibu ||
          (beer.ibu < state.beers.filter.ibu[1] &&
            beer.ibu > state.beers.filter.ibu[0]))
    );
  }

  static selectFilteredDetails(state: RootState): BeerDetails[] {
    const filtered = state.beers.list?.filter(
      (beer) =>
        (!state.beers.filter.abv ||
          (beer.abv < state.beers.filter.abv[1] &&
            beer.abv > state.beers.filter.abv[0])) &&
        (!state.beers.filter.srm ||
          (beer.srm < state.beers.filter.srm[1] &&
            beer.srm > state.beers.filter.srm[0])) &&
        (!state.beers.filter.ibu ||
          (beer.ibu < state.beers.filter.ibu[1] &&
            beer.ibu > state.beers.filter.ibu[0]))
    );

    return filtered.map((beer) => {
      const brewery = state.beers.brewery.find((b) => b.id === beer.breweryId);

      return { ...beer, brewery } as BeerDetails;
    });
  }
  static filterBy(
    state: RootState,
    predicate: (beer: Beer) => boolean
  ): Beer[] {
    return state.beers.list?.filter(predicate);
  }

  static approvedBeers(state: RootState): Beer[] {
    return this.filterBy(state, (beer) => beer.approved);
  }

  static byBrewery(state: RootState, breweryId: number): Beer[] {
    return this.filterBy(state, (beer) => beer.breweryId === breweryId);
  }
}
