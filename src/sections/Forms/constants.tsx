export const codeString =
` //  Почти все веб-приложения имеют формы.
 //  Элементы формы хранят свои значения в собственном внутреннем состоянии, что 
 //  противоречит подходу React, основанному на состоянии. Чтобы заставить эти две вещи работать вместе, 
 //  нам нужно более сложное решение, такое как использование контролируемых компонентов для каждого поля. 
 //  Но у создания формы гораздо больше аспектов, чем просто захват данных. Нам нужно проверить 
 //  правильность форматирования, все необходимые поля были установлены и все было успешно отправлено 
 //  при отправке. Это приводит к множеству сложной логики, которая может быстро нарастить. 
 //  Здесь может помочь библиотека Formik.
 //  Интеграция Formik для ваших  сводит к минимуму следующие моменты:
 // 
 //  1 - Управление состоянием формы - выполняется автоматически и локально. 
 //  Такие пакеты, как Redux Forms, связывают состояние вашей формы с деревом состояний. 
 //  Это означает, что ваш редуктор верхнего уровня вызывается при каждом нажатии клавиши. 
 //  Это ненужные накладные расходы и плохой дизайн. Состояние формы должно быть локальным.
 //  2 - Проверка формы - с помощью обработчиков проверки Formik и (необязательно) Yup. 
 //  Мы можем свободно обрабатывать валидацию с помощью Formik, как нам заблагорассудится, 
 //  однако вместо того, чтобы изобретать колесо, Formik также поддерживает Yup, наиболее широко 
 //  используемое решение для проверки объектов для React, прямо в его обработчики.
 //  3 - Обработка отправки формы - простой анализ значений и форматирование ошибок с помощью 
 //  функций-обработчиков, переданных в Formik.

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

const Example =
  () => {
    const classes = useStyles();

    const handleSubmit = (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setTimeout(() => {
        setSubmitting(false);
        console.log(JSON.stringify(values));
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
`;
