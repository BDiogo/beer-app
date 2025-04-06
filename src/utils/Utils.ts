export class Utils {
  static converBeerValueToColor(
    prop: { r: number; g: number; b: number }[],
    range: number[],
    value: number | undefined
  ): { r: number; g: number; b: number } {
    const valuePercentage = ((value || 0) - range[0]) / (range[1] - range[0]);

    const r = prop[0].r + (prop[1].r - prop[0].r) * valuePercentage;
    const g = prop[0].g + (prop[1].g - prop[0].g) * valuePercentage;
    const b = prop[0].b + (prop[1].b - prop[0].b) * valuePercentage;

    return { r, g, b };
  }
  static shiftCoordinate(
    coordinates: [number, number],
    maxOffset = 0.002
  ): [number, number] {
    const shift = (): number => (Math.random() - 0.5) * maxOffset;
    const shiftedLat = Number(coordinates[0]) + shift();
    const shiftedLng = Number(coordinates[1]) + shift();

    return [
      parseFloat(shiftedLat.toFixed(12)),
      parseFloat(shiftedLng.toFixed(12)),
    ];
  }
}
