import React, { ChangeEvent, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const colors = [
  'White',
  'DarkGrey',
  'LightBlue',
];

export interface StyleProps {
  color: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    color: ({ color }) => color,
  },
}));

const Example = () => {
  const [textColor, setTextColor] = useState(colors[0]);
  const classes = useStyles({ color: textColor });

  const handleChange = (event: ChangeEvent<{}>) => {
    setTextColor((event.target as HTMLInputElement).value);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Card className={classes.card}>
          <CardContent>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                { colors.length > 0 &&
                  colors.map((color: string) => (
                    <FormControlLabel
                      key={color}
                      value={color}
                      checked={color === textColor}
                      onChange={handleChange}
                      control={<Radio color="default" />}
                      label={color}
                      labelPlacement="start"
                    />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Example;
