import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from './hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import { selectTools, add, remove } from './toolsSlice';
import { Button } from "@material-ui/core";

const reduxTools = [
  'Reducer',
  'Action',
  'Store',
  'Dispatch',
  'Middleware',
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      padding: theme.spacing(2),
    },
    actions: {
      marginTop: theme.spacing(2),
    },
    btn: {
      margin: theme.spacing(1),
    },
  }),
);

const Example = () => {
  const classes = useStyles();
  const tools = useAppSelector(selectTools);
  const dispatch = useAppDispatch();

  const handleAddTool = () => dispatch(add(reduxTools[tools.length]));

  const handleRemoveTool = () => dispatch(remove(tools[tools.length - 1]));

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Redux Tools
          </Typography>
          <div className={classes.demo}>
            <List>
              {tools.length > 0 &&
                tools.map(tool => (
                  <ListItem key={tool}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tool}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
        <Grid
          className={classes.actions}
          item
          xs={12}
          sm={12}
        >
          {tools.length < reduxTools.length &&
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={handleAddTool}
            >
              Add tool
            </Button>}
          {tools.length > 0 &&
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={handleRemoveTool}
            >
              Remove tool
            </Button>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Example;
