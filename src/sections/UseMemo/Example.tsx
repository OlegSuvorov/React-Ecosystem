import React, { useState, useMemo, ChangeEvent, CSSProperties, memo, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import { Button } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { longList } from '../../generatedData/generatedList';

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

const message: string[] = [];

const Example =
  ({
     addMessage,
   }: {
    addMessage: Function;
  }) => {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
      message.push('Component reloading...');
      addMessage(message);
    });

    const handleText = (event: ChangeEvent) => {
      setText((event.target as HTMLInputElement).value);
    };

    const handleClear = () => {
      message.length = 0;
      addMessage('');
    };

    const handleSearch = () => {
      setSearch(text);
    };

    const renderList = (list: Record<string, string>[]) =>
      ({ index, style }: { index: number; style: CSSProperties }) => (
        <div
          style={style}
          className={classes.row}
        >
          { list[index].name }
        </div>
    );

    const memoList = useMemo(() => {
      message.push('List filtering...')
      return search
        ? longList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        : [];
    }, [search]);

    return (
      <div className={classes.root}>
        <Grid className={classes.label} item xs={12} sm={12}>
          Long list filter
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={text}
            onChange={handleText}
            fullWidth
          />
        </Grid>
        <Grid className={classes.btn} item xs={12} sm={12}>
          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
        {
          search && (
            <Grid className={classes.list} item xs={12} sm={12}>
              <FixedSizeList
                height={300}
                itemCount={memoList.length}
                itemSize={35}
                width={'100%'}
              >
                {renderList(memoList)}
              </FixedSizeList>
            </Grid>
          )
        }
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
