import React, { useState, ChangeEvent } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useWorker } from "web-worker-hooks";
import { WorkerPostMessage, WorkerSetOnMessage } from "web-worker-hooks/build/main/core/core";

let time = 0;

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

const Example =
  ({
     addMessage,
   }: {
    addMessage: Function;
  }) => {
    const classes = useStyles();
    const [number, setNumber] = useState(0);
    const [result, setResult] = useState(0);

    const worker = useWorker((
      postMessage: WorkerPostMessage,
      setOnMessage: WorkerSetOnMessage,
    ) => {
      const calculateFibonacci = (n: number) => {
        let prev = 0, next = 1;
        for(let i = 0; i < n; i++){
          let temp = next;
          next = prev + next;
          prev = temp;
        }
        return prev;
      }

      setOnMessage((msg: MessageEvent) => {
        postMessage(calculateFibonacci(msg.data));
      });
    });

    worker.onmessage = (msg) => {
      setResult(msg.data);
      addMessage(`Calculation time: ${new Date().getTime() - time}`);
    };

    const handleChange = (event: ChangeEvent) => {
      setNumber(+((event.target as HTMLInputElement).value));
    };

    const handleCalculate = () => {
      time = new Date().getTime();
      worker.postMessage(number);
    };

    return (
      <div className={classes.root}>
        <Grid className={classes.label} item xs={12} sm={12}>
          Calculate Fibonacci sequence
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            value={number}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid className={classes.btn} item xs={12} sm={12}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button
                variant="contained"
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              { `Result: ${result}` }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

export default Example;
