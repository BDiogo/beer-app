import React, { memo } from "react";
import { Formik, Form, Field, FieldArray, FieldProps } from "formik";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import bottleImage from "../assets/bottle.svg";
import { AddCircleOutline, CancelOutlined } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { CreateBeerFields, FormValidation } from "../utils/FormValidation";
import { BeerThunk } from "../store/beer/BeerThunk";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Brewery } from "../brewery/interface/brewery";
import { BeerSelector } from "../store/beer/BeerSelector";
import { useNavigate } from "react-router-dom";

export const BeerAdd = memo((): React.ReactElement => {
  const [errorCreating, setErrorCreating] = React.useState<null | string>(null);
  const { creating } = useAppSelector((state) => state.beers);
  const brewery = useAppSelector((state) => BeerSelector.selectBrewery(state));
  const schema = FormValidation.getBeerSchema();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: CreateBeerFields) => {
    setErrorCreating(null);
    try {
      const result = await dispatch(BeerThunk.createBeer(values)).unwrap();
      navigate(`/list/${result.id}`);
    } catch {
      setErrorCreating(
        "Error creating beer. Please check the form and try again."
      );
    }
  };

  return (
    <Container>
      <Grid container spacing={2} sx={SX.FORM_WRAPPER}>
        <Formik
          initialValues={{
            name: "",
            style: "",
            volume: 33,
            ibu: 0,
            abv: 6,
            srm: 6,
            description: "",
            food_pairing: [],
            breweryId: undefined,
            image: null,
          }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values }) => (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  component="img"
                  src={
                    values.image
                      ? URL.createObjectURL(values.image)
                      : bottleImage
                  }
                  alt="Beer Bottle"
                  loading="lazy"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 8 }} sx={SX.FORM}>
                {errorCreating && (
                  <Alert severity="error" sx={SX.ALERT_WRAPPER}>
                    {errorCreating}
                  </Alert>
                )}
                <Form>
                  <Field
                    name="name"
                    as={TextField}
                    size="medium"
                    sx={{ flex: "1 1 340px" }}
                    label="Name"
                    error={touched.name && errors.name}
                    helperText={touched.name && errors.name}
                  />

                  <Field
                    name="style"
                    as={TextField}
                    size="medium"
                    sx={{ flex: "1 1 340px" }}
                    label="Style"
                    error={touched.style && errors.style}
                    helperText={touched.style && errors.style}
                  />

                  <Field
                    name="volume"
                    type="number"
                    as={TextField}
                    size="medium"
                    label="Volume (ml)"
                    sx={{ flex: "1 1 60px" }}
                    error={touched.volume && errors.volume}
                    helperText={touched.volume && errors.volume}
                  />

                  <Field
                    name="ibu"
                    type="number"
                    as={TextField}
                    size="medium"
                    label="IBU"
                    sx={{ flex: "1 1 60px" }}
                    error={touched.ibu && errors.ibu}
                    helperText={touched.ibu && errors.ibu}
                  />

                  <Field
                    name="abv"
                    type="number"
                    as={TextField}
                    size="medium"
                    label="ABV %"
                    sx={{ flex: "1 1 60px" }}
                    error={touched.abv && errors.abv}
                    helperText={touched.abv && errors.abv}
                  />

                  <Field
                    name="srm"
                    type="number"
                    as={TextField}
                    size="medium"
                    label="SRM"
                    sx={{ flex: "1 1 60px" }}
                    error={touched.srm && errors.srm}
                    helperText={touched.srm && errors.srm}
                  />

                  <Field
                    name="description"
                    as={TextField}
                    size="medium"
                    label="Description"
                    sx={{ flex: "1 1 100%" }}
                    multiline
                    rows={4}
                    error={touched.description && errors.description}
                    helperText={touched.description && errors.description}
                  />
                  <Field name="breweryId">
                    {({ field, form }: FieldProps) => (
                      <Autocomplete
                        sx={{ flex: "1 1 100%" }}
                        options={brewery}
                        getOptionLabel={(option: Brewery) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={
                          brewery.find((b: Brewery) => b.id === field.value) ||
                          null
                        }
                        onChange={(_, value) =>
                          form.setFieldValue("breweryId", value?.id || "")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Brewery"
                            error={!!(touched.breweryId && errors.breweryId)}
                            helperText={touched.breweryId && errors.breweryId}
                            size="medium"
                            sx={{ flex: "1 1 340px" }}
                          />
                        )}
                      />
                    )}
                  </Field>

                  <FieldArray
                    name="food_pairing"
                    render={(arrayHelpers) => (
                      <Box sx={SX.FOOD_PAIRING_CONTAINER}>
                        <Typography variant="body1" sx={{ flex: "1" }}>
                          Add food pairings
                        </Typography>
                        {values.food_pairing?.map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              flex: "1 1 100%",
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Field
                              as={TextField}
                              size="medium"
                              sx={{ flex: "1 1 100%" }}
                              name={`food_pairing[${index}].value`}
                              error={
                                touched.food_pairing?.[index] &&
                                errors.food_pairing?.[index]
                              }
                              helperText={
                                touched.food_pairing?.[index] &&
                                errors.food_pairing?.[index]
                              }
                            />

                            <Button onClick={() => arrayHelpers.remove(index)}>
                              <CancelOutlined />
                            </Button>
                          </Box>
                        ))}
                        <Button
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({ name: "", age: "" })
                          }
                        >
                          <AddCircleOutline />
                          Add
                        </Button>
                      </Box>
                    )}
                  ></FieldArray>
                  <Field name="image">
                    {({ form }: FieldProps) => (
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          form.setFieldValue(
                            "image",
                            event.currentTarget.files?.[0] || null
                          );
                        }}
                        className="input-file"
                      />
                    )}
                  </Field>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={creating}
                  >
                    Add Beer
                  </Button>
                </Form>
              </Grid>
            </>
          )}
        </Formik>
      </Grid>
    </Container>
  );
});

class SX {
  static ALERT_WRAPPER: SxProps<Theme> = {
    margin: (t) => `${t.spacing(2)} 0`,
  };
  static FORM_WRAPPER: SxProps<Theme> = {
    padding: (t) => `${t.spacing(4)} 0`,

    "& img": {
      width: "90%",
    },
    "& .input-file": {
      flex: "1 1 100%",
      border: (t) => `1px solid ${t.palette.action.disabled}`,
      padding: (t) => t.spacing(1),
      borderRadius: (t) => t.spacing(0.5),

      "&::file-selector-button": {
        backgroundColor: grey[200],
        border: "none",
        fontWeight: 600,
        padding: (t) => `${t.spacing(1)} ${t.spacing(2)}`,
        cursor: "pointer",
        color: (t) => t.palette.text.primary,
        boxShadow: (t) => t.shadows[2],
      },
    },
  };

  static FORM: SxProps<Theme> = {
    padding: (t) => `${t.spacing(4)} 0`,
    "& form": {
      display: "flex",
      gap: (t) => `${t.spacing(2)}`,
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };

  static FOOD_PAIRING_CONTAINER: SxProps<Theme> = {
    flex: "1 1 100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "center",
  };
}
