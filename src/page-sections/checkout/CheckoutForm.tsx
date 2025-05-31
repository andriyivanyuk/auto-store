"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik } from "formik";
import * as yup from "yup";

import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import Select from "@component/Select";

import useCart from "@hook/useCart";
import {
  fetchNovaPoshtaBranches,
  fetchNovaPoshtaCities,
  submitOrder,
} from "services/apiService";

export interface DeliverySelection {
  cityLabel: string;
  branchLabel: string;
}

interface CheckoutFormProps {
  deliverySelection: DeliverySelection;
  setDeliverySelection: React.Dispatch<React.SetStateAction<DeliverySelection>>;
}

type SelectOption = {
  label: string;
  value: string;
  region?: string;
  ref?: string;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comment: "",
  deliveryType: "Нова Пошта",
  paymentMethod: "Онлайн оплата",
  city: null as SelectOption | null,
  branch: null as SelectOption | null,
};

const checkoutSchema = yup.object({
  firstName: yup.string().required("Обов'язкове поле"),
  lastName: yup.string().required("Обов'язкове поле"),
  email: yup.string().email("Невалідна пошта").required("Обов'язкове поле"),
  phone: yup.string().required("Обов'язкове поле"),
  city: yup.object().nullable().required("Оберіть місто"),
  branch: yup.object().nullable().required("Оберіть відділення"),
});

const getStoreIdFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )storeId=([^;]+)"));
  return match ? match[2] : null;
};

export default function CheckoutForm({
  deliverySelection,
  setDeliverySelection,
}: CheckoutFormProps) {
  const router = useRouter();
  const { state } = useCart();

  const [storeId, setStoreId] = useState<string | null>(null);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const id = getStoreIdFromCookie();
    setStoreId(id);
  }, []);

  const handleCitySearch = async (inputValue: string) => {
    if (inputValue.length < 3 || !storeId) return;
    try {
      const data = await fetchNovaPoshtaCities(inputValue, storeId);
      setCityOptions(
        data.map((city: any) => ({
          label: city.Description,
          value: city.Ref,
          region: city.AreaDescription,
          ref: city.Ref,
        }))
      );
    } catch (e) {
      console.error("Помилка при завантаженні міст:", e);
    }
  };

  const handleCityChange = async (
    selectedCity: SelectOption | null,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("city", selectedCity);
    setDeliverySelection((prev) => ({
      ...prev,
      cityLabel: selectedCity?.label || "",
      branchLabel: "", // очищаємо, бо нове місто
    }));

    if (!storeId || !selectedCity) return;
    try {
      const branches = await fetchNovaPoshtaBranches(
        selectedCity.ref!,
        storeId
      );
      setBranchOptions(
        branches.map((branch: any) => ({
          label: branch.Description,
          value: branch.Ref,
        }))
      );
    } catch (e) {
      console.error("Помилка при завантаженні відділень:", e);
    }
  };

  const handleFormSubmit = async (
    values: typeof initialValues,
    actions: any
  ) => {
    try {
      setDeliverySelection({
        cityLabel: values.city?.label || "",
        branchLabel: values.branch?.label || "",
      });

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        comment: values.comment,
        deliveryType: values.deliveryType,
        paymentMethod: values.paymentMethod,
        deliveryDetails: {
          city: values.city?.label,
          region: values.city?.region,
          branch: values.branch?.label,
        },
        items: state.cart.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price,
        })),
      };

      const { orderId } = await submitOrder(payload);
      if (orderId) {
        localStorage.setItem("lastOrderId", orderId.toString());
      }
      // router.push(`/payment?orderId=${orderId}`);
      router.push("/order-success");
    } catch (error) {
      console.error("Помилка при створенні замовлення:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (!storeId) return null;

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
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Доставка
            </Typography>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Select
                  label="Місто"
                  options={cityOptions}
                  onInputChange={(input, { action }) => {
                    if (action === "input-change") handleCitySearch(input);
                    return input;
                  }}
                  onChange={(value: SelectOption | null) =>
                    handleCityChange(value, setFieldValue)
                  }
                  value={values.city}
                  errorText={
                    touched.city && typeof errors.city === "string"
                      ? errors.city
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  label="Відділення"
                  options={branchOptions}
                  onChange={(value: SelectOption | null) => {
                    setFieldValue("branch", value);
                    setDeliverySelection((prev) => ({
                      ...prev,
                      branchLabel: value?.label || "",
                    }));
                  }}
                  value={values.branch}
                  errorText={
                    touched.branch && typeof errors.branch === "string"
                      ? errors.branch
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Card1>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Інформація про замовника
            </Typography>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ім'я"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  errorText={
                    touched.firstName && typeof errors.firstName === "string"
                      ? errors.firstName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Прізвище"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  errorText={
                    touched.lastName && typeof errors.lastName === "string"
                      ? errors.lastName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  errorText={
                    touched.email && typeof errors.email === "string"
                      ? errors.email
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  errorText={
                    touched.phone && typeof errors.phone === "string"
                      ? errors.phone
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Коментар"
                  name="comment"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comment}
                />
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullWidth
                >
                  До кошика
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Надсилання..." : "Перейти до оплати"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
