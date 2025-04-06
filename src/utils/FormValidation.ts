import * as Yup from "yup";

export interface CreateBeerFields {
  name: string;
  style: string;
  volume: number;
  ibu: number;
  abv: number;
  srm: number;
  description: string;
  food_pairing:
    | {
        value?: string | undefined;
      }[]
    | undefined;
  image: File | null | undefined;
  breweryId: number | undefined;
}

export class FormValidation {
  static getBeerSchema(): Yup.ObjectSchema<CreateBeerFields> {
    return Yup.object().shape({
      name: Yup.string()
        .min(2, "Too Short")
        .max(50, "Too Long")
        .required("Required"),
      style: Yup.string()
        .min(2, "Too Short")
        .max(50, "Too Long")
        .required("Required"),
      volume: Yup.number()
        .min(2, "Too Low")
        .max(500, "Too Long")
        .required("Required"),
      ibu: Yup.number()
        .min(0, "Too Low")
        .max(100, "Too Long")
        .required("Required"),
      abv: Yup.number()
        .min(3, "Too Low")
        .max(20, "Too Long")
        .required("Required"),
      srm: Yup.number()
        .min(0, "Too Low")
        .max(75, "Too Long")
        .required("Required"),
      breweryId: Yup.number().required("Required"),
      description: Yup.string()
        .min(2, "Too Short")
        .max(500, "Too Long")
        .required("Required"),
      food_pairing: Yup.array()
        .of(
          Yup.object().shape({
            value: Yup.string()
              .min(2, "Item too short (min 2 chars)")
              .max(50, "Item too long (max 50 chars)"),
          })
        )
        .max(10, "Maximum 10 food pairings allowed"),
      image: Yup.mixed<File>()
        .nullable()
        .test("fileSize", "File too large (max 2MB)", (file) => {
          if (!file) return true;
          return file.size <= 2 * 1024 * 1024;
        })
        .test("fileType", "Only images accepted", (file) => {
          if (!file) return true;
          return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
        })
        .nullable(),
    });
  }
}
