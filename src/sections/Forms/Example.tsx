import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    row: {
      padding: 16,
    },
    formName: {
      margin: 0,
    },
    grid: {
      marginBottom: 16,
    }
  }),
);

const Example =
  ({
     addMessage,
   }: {
    addMessage: Function;
    clearAll: Function;
  }) => {
    const classes = useStyles();

    const handleSubmit = (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setTimeout(() => {
        setSubmitting(false);
        addMessage(JSON.stringify(values));
      }, 500);
    };

    const initialValues: FormValues = {
      firstName: '',
      lastName: '',
      email: '',
    };

    return (
      <div className={classes.root}>
        <Grid item xs={12} sm={12}>
          <div className={classes.row}>
            <h1 className={classes.formName}>Signup</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({
                  submitForm,
                  isSubmitting
              }) => (
                <Form>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className={classes.grid}
                  >
                    <Field
                      component={TextField}
                      name="firstName"
                      label="First name"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className={classes.grid}
                  >
                    <Field
                      component={TextField}
                      name="lastName"
                      label="Last name"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className={classes.grid}
                  >
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    className={classes.grid}
                  >
                    {isSubmitting && <LinearProgress />}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </div>
    );
  };

export default Example;
