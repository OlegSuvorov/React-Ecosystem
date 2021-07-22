import React, { useState } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  console: {
    marginTop: 8,
  },
});

const Implementation =
  ({
     component: Component,
     isConsoleOpen = false,
  }: {
  component: React.ReactNode;
  isConsoleOpen?: boolean;
}) => {
  const [messages, setMessages] = useState(['']);
  const classes = useStyles();

  const addMessage = (message: string | string[]) => {
    const newMessages = Array.isArray(message)
      ? [...messages, ...message]
      : [...messages, message];
    setMessages(newMessages);
  };
  const clearAll = () => setMessages(['']);
  const extraProps = { addMessage, clearAll };

  return (
    <div className={classes.root}>
      <Paper>
        <Grid item xs={12} sm={12}>
          {
            // @ts-ignore
            <Component { ...extraProps }/>
          }
        </Grid>
      </Paper>
      <Paper>
        {isConsoleOpen &&
          <Grid className={classes.console} item xs={12} sm={12}>
            <Card variant="outlined">
              <CardContent>
                {messages && messages.length > 0 &&
                  messages.map((message: string, index: number) => (
                    <Typography key={`${message}${index}`} color="textSecondary" gutterBottom>
                      {message}
                    </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>}
      </Paper>
    </div>
  );
};

export default Implementation;
