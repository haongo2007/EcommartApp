"use client"
import Link from "next/link";
import {Formik} from "formik";
import * as yup from "yup";
import {CameraEnhance, Person} from "@mui/icons-material";
import {Avatar, Box, Button, CircularProgress, Grid, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/client/card/Card1";
import {FlexBox} from "components/client/flex-box";
import AccountHeader from "./AccountHeader";
import { useAccountContext } from "providers/AccountProvider";
import { trpc } from "providers/trpcProvider";
import { toast } from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';
import {useSnackbar} from "notistack";

// ===========================================================
export default function AccountEdit({locale,domain}:{locale:string,domain:string}){
    const { account } = useAccountContext();
    const { enqueueSnackbar } = useSnackbar();
    const INITIAL_VALUES = {
        email: account?.email || "",
        phone: account?.phone || "",
        last_name: account?.last_name || "",
        first_name: account?.first_name || "",
        birthday: new Date(account?.birthday || ''),
        store_id: account?.store_id,
    };
    const checkoutSchema = yup.object().shape({
        first_name: yup.string().required("required"),
        last_name: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        phone: yup.string().required("required"),
        birthday: yup.date().required("invalid date"),
    });
    const saveAvatar = (e) => {
        console.log(e);
        // https://github.com/monroeclinton/gibber/blob/main/src/components/client/post/create/index.tsx
    }
    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    const { mutate: updateCustomer, isLoading: isUpdatingProduct } =
        trpc.customer.updateCustomer.useMutation({
            retry: false,
            onSuccess: (res) => {
                reloadSession();
                enqueueSnackbar("Update Customer Success", {
                    variant: "success",
                });
            },
            onError: (err) => enqueueSnackbar(err.message, {
                variant: "error",
            }),
        });
    const handleFormSubmit = async (values) => {
        updateCustomer({
            ...values,
            store_id: account?.store_id,
            id: account?.id || "",
        });
    }; // SECTION TITLE HEADER LINK

    const HEADER_LINK = (
        <Link href={`/${locale}/${domain}/account`} passHref>
            <Button
                color="primary"
                sx={{
                    px: 4,
                    bgcolor: "primary.light",
                }}
            >
                Back to Profile
            </Button>
        </Link>
    ); // Show a loading state when the fallback is rendered

    return (
        <>
            {/* TITLE HEADER AREA */}
            <AccountHeader
                icon={Person}
                title="Edit Profile"
                button={HEADER_LINK}
            />

            {/* PROFILE EDITOR FORM */}
            <Card1>
                <FlexBox alignItems="flex-end" mb={3}>
                    <Avatar
                        src={account?.avatar}
                        sx={{
                            height: 64,
                            width: 64,
                        }}
                    />

                    <Box ml={-2.5}>
                        <label htmlFor="profile-image">
                            <Button
                                component="span"
                                color="secondary"
                                sx={{
                                    p: "8px",
                                    height: "auto",
                                    bgcolor: "grey.300",
                                    borderRadius: "50%",
                                }}
                            >
                                <CameraEnhance fontSize="small"/>
                            </Button>
                        </label>
                    </Box>

                    <Box display="none">
                        <input
                            onChange={(e) => saveAvatar(e as React.ChangeEvent<HTMLInputElement>)}
                            id="profile-image"
                            accept="image/*"
                            type="file"
                        />
                    </Box>
                </FlexBox>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={INITIAL_VALUES}
                    validationSchema={checkoutSchema}
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
                            <Box mb={4}>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="first_name"
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.first_name}
                                            error={!!touched.first_name && !!errors.first_name}
                                            helperText={touched.first_name && errors.first_name}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="last_name"
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.last_name}
                                            error={!!touched.last_name && !!errors.last_name}
                                            helperText={touched.last_name && errors.last_name}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            type="email"
                                            label="Email"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            onChange={handleChange}
                                            error={!!touched.phone && !!errors.phone}
                                            helperText={touched.phone && errors.phone}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Birth Date"
                                                maxDate={new Date()}
                                                value={values.birthday}
                                                inputFormat="dd MMMM, yyyy"
                                                renderInput={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        helperText={touched.birthday && errors.birthday}
                                                        error={
                                                            (!!touched.birthday && !!errors.birthday) ||
                                                            props.error
                                                        }
                                                        {...props}
                                                    />
                                                )}
                                                onChange={(newValue) =>
                                                    setFieldValue("birthday", newValue)
                                                }
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Box>

                            <LoadingButton
                                variant="contained" color="primary" 
                                type="submit"
                                loading={isUpdatingProduct}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Save Changes
                            </LoadingButton>
                        </form>
                    )}
                </Formik>
            </Card1>
        </>
    );
};