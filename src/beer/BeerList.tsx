import React, { memo } from "react";
import { useAppSelector } from "../store/hook";
import { BeerSingle } from "./BeerListSingle";
import { Container, Grid, SxProps, Theme } from "@mui/material";
import { Beer } from "./interface/beer";
import { BeerSelector } from "../store/beer/BeerSelector";
import { ResultsNotFound } from "../common/ResultsNotFound";

export const BeerList = memo((): React.ReactElement => {
  const list = useAppSelector((state) => BeerSelector.selectFiltered(state));

  return (
    <Container>
      <Grid container spacing={2} sx={SX.BEER_LIST}>
        {list.map((beer: Beer) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={beer.id}>
            <BeerSingle beer={beer} />
          </Grid>
        ))}
        {!list.length && <ResultsNotFound />}
      </Grid>
    </Container>
  );
});
class SX {
  static BEER_LIST: SxProps<Theme> = {
    padding: (t) => `${t.spacing(3)} 0`,
  };
}
