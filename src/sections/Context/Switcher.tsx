import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { CustomThemeContext, Themes } from './Example';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const Switcher = () => {
  const { setThemeName } = useContext(CustomThemeContext);
  const classes = useStyles();

  const handleClick = (theme: Themes) => () => {
    setThemeName?.(theme);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<WbSunnyIcon />}
          onClick={handleClick(Themes.light)}
        >
          Light
        </Button>
        Switch to light theme
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<Brightness4Icon />}
          onClick={handleClick(Themes.dark)}
        >
          Dark
        </Button>
        Switch to dark theme
      </Grid>
    </div>
  );
};

export default Switcher;
