import { Button, Grid, TextField } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import React from "react";
import { Contact } from "../hooks/useContactDb";

export const ContactForm: React.FC<{
  contact?: Contact;
  onSave: (values: Omit<Contact, "id">) => void;
}> = (props) => {
  const form = useFormik({
    initialValues: props.contact
      ? {
          name: props.contact.name,
          phoneNumber: props.contact.phoneNumber,
        }
      : {
          name: "",
          phoneNumber: "",
        },
    validate: (values) => {
      const errors: FormikErrors<typeof values> = {};

      if (!values.name || values.name.length < 3)
        errors.name = "Please provide a name with at least 3 characters";

      if (!values.phoneNumber || !values.phoneNumber.match(/^\+[0-9]{5,}$/))
        errors.phoneNumber =
          "Please provide a phonenumber with at least 5 digits";

      return errors;
    },
    onSubmit: (values) => {
      props.onSave(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={form.handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ "data-testid": "name-input" }}
            name="name"
            value={form.values.name}
            label="name"
            fullWidth
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && !!form.errors.name}
            placeholder="John Doe"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={form.handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ "data-testid": "phonenumber-input" }}
            name="phoneNumber"
            value={form.values.phoneNumber}
            label="phone number"
            type="tel"
            fullWidth
            helperText={form.touched.phoneNumber && form.errors.phoneNumber}
            error={form.touched.phoneNumber && !!form.errors.phoneNumber}
            placeholder="+49123456789"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!form.isValid}
            type={"submit"}
            fullWidth
            variant="contained"
            color="primary"
          >
            Save contact
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="text" href="/">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
