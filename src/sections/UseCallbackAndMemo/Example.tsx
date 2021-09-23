import React, {useState, ChangeEvent, memo, useEffect, useCallback} from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const message: string[] = [];
const initialChildren = {
  usual: 'Usual',
  memo: 'Memo',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    row: {
      padding: 16,
    },
    btn: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      '& button': {
        width: 200,
      }
    },
    label: {
      paddingBottom: theme.spacing(1),
    },
    clear: {
      position: 'absolute',
      bottom: -58,
      right: theme.spacing(2),
    },
    list: {
      marginTop: theme.spacing(2),
      border: '1px solid #6d6d6d',
      borderRadius: 4,
    }
  }),
);

const Child = (
  {
    childName,
    changeName,
    addMessage,
  }: {
    childName: string;
    changeName: Function;
    addMessage: Function;
  }) => {
  const [name, setName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    addMessage(`${childName} reloading...`);
  });

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  };

  const handleChangeName = () => changeName(name);

  return (
    <Card variant="outlined">
      <CardContent>
        {childName &&
          <>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h6"
            >
              {`${childName} child`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              value={name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid className={classes.btn} item xs={12} sm={12}>
            <Button
              variant="contained"
              onClick={handleChangeName}
            >
              Change Name
            </Button>
          </Grid>
          </>
        }
      </CardContent>
  </Card>);
};

const MemoChild = memo(Child, (prev, next) =>
  prev.childName === next.childName);

const Example =
  ({
     addMessage,
   }: {
    addMessage: Function;
  }) => {
    const classes = useStyles();
    const [usual, setUsual] = useState(initialChildren.usual);
    const [memo, setMemo] = useState(initialChildren.memo);

    const handleAddMessage = (text: string) => {
      message.push(text);
      addMessage(message);
    };

    const memoAddMessage = useCallback(handleAddMessage, []);

    const handleClear = () => {
      message.length = 0;
      addMessage('');
    };

    const memoSetUsual = useCallback((text: string) => {
      // Some additional logic
      setUsual(text);
    }, []);

    const memoSetMemo = useCallback((text: string) => {
      // Some additional logic
      setMemo(text);
    }, []);

    return (
      <div className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Child
            childName={usual}
            changeName={memoSetUsual}
            addMessage={memoAddMessage}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MemoChild
            childName={memo}
            changeName={memoSetMemo}
            addMessage={memoAddMessage}
          />
        </Grid>
        <Button
          className={classes.clear}
          variant="contained"
          onClick={handleClear}
        >
          Clear console
        </Button>
      </div>
    );
  };

export default memo(Example, (prev, next) =>
  prev.addMessage === next.addMessage
);
