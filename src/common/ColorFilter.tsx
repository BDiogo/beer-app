import React, { memo, useMemo } from "react";
import { Box, Button, Menu, Slider, SxProps, Theme } from "@mui/material";
import { Utils } from "../utils/Utils";
import CircleIcon from "@mui/icons-material/Circle";

interface Props {
  rangeMin: number;
  rangeMax: number;
  colors: { r: number; g: number; b: number }[];
  value: [number, number];
  label: string;
  setValue: (value: [number, number]) => void;
}
export const ColorFilter = memo((props: Props): React.ReactElement => {
  const { rangeMin, rangeMax, value, setValue, label, colors } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [localValue, setLocalValue] = React.useState<[number, number]>(value);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValue(localValue);
  };

  const handleChange = (newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setLocalValue([
        Math.min(newValue[0], localValue[1] - rangeMin),
        localValue[1],
      ]);
    } else {
      setLocalValue([
        localValue[0],
        Math.max(newValue[1], localValue[0] + rangeMin),
      ]);
    }
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }
  const colorsSlider = useMemo(() => {
    const colorMin = Utils.converBeerValueToColor(
      colors,
      [rangeMin, rangeMax],
      localValue[0]
    );
    const colorMax = Utils.converBeerValueToColor(
      colors,
      [rangeMin, rangeMax],
      localValue[1]
    );
    return [
      `rgb(${colorMin.r}, ${colorMin.g}, ${colorMin.b})`,
      `rgb(${colorMax.r}, ${colorMax.g}, ${colorMax.b})`,
    ];
  }, [colors, rangeMax, rangeMin, localValue]);

  const colorInput = useMemo(() => {
    const color = Utils.converBeerValueToColor(
      colors,
      [rangeMin, rangeMax],
      localValue[0] + (localValue[1] - localValue[0] / 2)
    );
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }, [colors, rangeMax, rangeMin, localValue]);

  return (
    <Box>
      <Button onClick={handleClick} variant="outlined" sx={SX.BUTTON}>
        <CircleIcon sx={{ color: colorInput }} />
        {label}
      </Button>
      <Menu
        sx={SX.MENU}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={SX.SLIDER_BOX}>
          <Slider
            sx={SX.SLIDER(colorsSlider)}
            getAriaLabel={() => "Temperature range"}
            value={localValue}
            onChange={(_, n, a) => handleChange(n, a)}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={rangeMin}
            max={rangeMax}
          />
        </Box>
      </Menu>
    </Box>
  );
});

class SX {
  static BUTTON: SxProps<Theme> = {
    color: "text.secondary",
    textTransform: "none",
    borderColor: "grey.200",
    gap: (t) => `${t.spacing(1)}`,
  };

  static MENU: SxProps<Theme> = {
    padding: `0`,
    overflowY: "visible",
    gap: (t) => `${t.spacing(1)}`,
  };

  static SLIDER_BOX: SxProps<Theme> = {
    padding: (t) => `${t.spacing(2)} ${t.spacing(4)}  `,
    width: "220px",
    overflowY: "visible",
    position: "relative",
  };
  static SLIDER = (colors: string[]): SxProps => ({
    width: "100%",
    height: "8px",

    "& .MuiSlider-track": {
      border: "none",
      background: `linear-gradient(0.25turn, ${colors[0]}, ${colors[1]})`,
    },
    '& .MuiSlider-thumb[data-index="0"]': {
      background: colors[0],
    },

    '& .MuiSlider-thumb[data-index="1"]': {
      background: colors[1],
    },
  });
}
