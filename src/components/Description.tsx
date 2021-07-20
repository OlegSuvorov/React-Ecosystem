import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    div: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);

const Description = ({ description }: { description: string[] }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            {description
            && description.length > 0
            && description.map((part: string, index: number) => (
              <div key={`${part[0]}${index}`} className={classes.div}>
                {part}
              </div>
            ))}
          </Paper>
        </Grid>
    </div>
  );
};

export default Description;
