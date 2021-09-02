import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useFetch } from "./useFetch";

const url = 'https://rickandmortyapi.com/api/character/';
const fields = [
  'Name',
  'Species',
  'Status',
]

const actions = [
  { name: 'Rick', id: '1' },
  { name: 'Morty', id: '2' },
  { name: 'Error', id: 'error' },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    image: {
      width: 200,
      height: 200,
    },
    card: {
      display: 'flex',
      marginTop: theme.spacing(1),
    },
    grid: {
      padding: '0 20px',
    },
    actions: {
      marginTop: theme.spacing(2),
    },
    btn: {
      margin: theme.spacing(1),
    },
    error: {
      padding: theme.spacing(1),
    }
  }),
);

const Example = () => {
  const classes = useStyles();

  const { data, error, isLoading, setUrl } = useFetch('');

  const handleClick = (id: string) => () => setUrl(`${url}${id}`);
  const fetchError = error || data?.error;

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        {data && !fetchError &&
          <Card className={classes.card}>
          <div>
            <CardMedia
              className={classes.image}
              image={data?.image}
            />
          </div>
          <Grid container spacing={2}>
            {fields.map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  className={classes.card}
                  key={field}
                >
                  <Grid item xs={3}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className={classes.grid}
                    >
                      {field}:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className={classes.grid}
                    >
                      {data?.[field.toLowerCase()]}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        </Card>}
        {fetchError && (
          <Typography
            variant="h4"
            gutterBottom
            align="left"
            className={classes.error}
          >
            {fetchError}
          </Typography>
        )}
      </Grid>
      <Grid
        className={classes.actions}
        item
        xs={12}
        sm={12}
      >
        <Card className={classes.card}>
          {actions.map(({ id, name }) => (
            <Button
              key={name}
              className={classes.btn}
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleClick(id)}
            >
              Get {name}
            </Button>
          ))}
        </Card>
      </Grid>
    </div>
  );
};

export default Example;
