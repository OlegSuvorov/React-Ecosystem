import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Code =
  ({
     codeString,
     children,
  }:
  {
   codeString: string;
   children: React.ReactNode,
  }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
            <SyntaxHighlighter
              language="javascript"
              style={vs2015}
              customStyle={{
                marginTop: 0,
                paddingTop: 16,
                borderRadius: 4,
              }}>
              { codeString }
            </SyntaxHighlighter>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Code;
