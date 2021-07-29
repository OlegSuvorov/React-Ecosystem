import React, {CSSProperties} from 'react';
import { FixedSizeList } from 'react-window';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { longList } from '../../generatedData/generatedList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    row: {
      padding: 8,
      cursor: 'pointer',
    },
  }),
);

const Example =
  ({
     addMessage,
     clearAll,
  }: {
    addMessage: Function;
    clearAll: Function;
  }) => {
  const classes = useStyles();

  const handleClick = (row: Record<string, string>) => () => {
    addMessage(`id: ${row.id}, name: ${row.name}`);
  }

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div
      style={style}
      className={classes.row}
      onClick={handleClick(longList[index])}
    >
      { longList[index].name }
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <FixedSizeList
          height={300}
          itemCount={longList.length}
          itemSize={35}
          width={'100%'}
        >
          {Row}
        </FixedSizeList>
      </Grid>
    </div>
  );
};

export default Example;
