"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik } from "formik";

import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
import countryList from "@data/countryList";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};

const checkoutSchema = yup.object({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default function CheckoutForm() {
  const router = useRouter();

  const handleFormSubmit = async (values: typeof initialValues) => {
    router.push("/payment");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  mb="1rem"
                  label="Full Name"
                  name="shipping_name"
                  placeholder="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name}
                  errorText={touched.shipping_name && errors.shipping_name}
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  label="Phone Number"
                  placeholder="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_contact"
                  value={values.shipping_contact}
                  errorText={
                    touched.shipping_contact && errors.shipping_contact
                  }
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  type="number"
                  label="Zip Code"
                  placeholder="Zip Code"
                  onBlur={handleBlur}
                  name="shipping_zip"
                  onChange={handleChange}
                  value={values.shipping_zip}
                  errorText={touched.shipping_zip && errors.shipping_zip}
                />

                <TextField
                  fullWidth
                  label="Address 1"
                  placeholder="Address 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address1"
                  value={values.shipping_address1}
                  errorText={
                    touched.shipping_address1 && errors.shipping_address1
                  }
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  mb="1rem"
                  type="email"
                  placeholder="Email Address"
                  onBlur={handleBlur}
                  label="Email Address"
                  name="shipping_email"
                  onChange={handleChange}
                  value={values.shipping_email}
                  errorText={touched.shipping_email && errors.shipping_email}
                />

                <TextField
                  fullWidth
                  mb="1rem"
                  label="Company"
                  placeholder="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_company"
                  value={values.shipping_company}
                  errorText={
                    touched.shipping_company && errors.shipping_company
                  }
                />

                <Select
                  mb="1rem"
                  label="Country"
                  options={countryList}
                  value={values.shipping_country || "US"}
                  errorText={
                    touched.shipping_country && errors.shipping_country
                  }
                  onChange={(country) =>
                    setFieldValue("shipping_country", country)
                  }
                />

                <TextField
                  fullWidth
                  label="Address 2"
                  placeholder="Address 2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address2"
                  value={values.shipping_address2}
                  errorText={
                    touched.shipping_address2 && errors.shipping_address2
                  }
                />
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullWidth
                >
                  До Кошика
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Перейти до оплати
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
