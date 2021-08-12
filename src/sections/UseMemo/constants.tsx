export const codeString =
` //  Хук useMemo используется для мемоизации значений. Как это работает?  
 //  В функциональном компоненте у нас могут быть функции, которые производят 
 //  промежуточные вычисления для получения новых знаний в компонентах.
 // 
 //  Вот несколько случаев, когда следует рассмотреть возможность использования useMemo:
 // 
 //  - Ррендеринг компонента происходит очень медленно, результат вычисления передается неизвестному количеству 
 //  дочерних элементов, например: при рендеринге дочерних элементов с помощью Array.map()
 //  - Приложение часто перестает отвечать, потому что получает большой объем данных и необходимо 
 //  преобразовать их в пригодный для использования формат.
 //
 //  Почему бы тогда не использовать useMemo везде?
 //
 //  К сожалению это не бесплатная оптимизация производительности.
 //  При настройке useMemo возникают дополнительные затраты (например, использование памяти), 
 //  которые могут очень быстро перевесить выигрыш в производительности от запоминания возможных значений 
 //  каждой отдельной функции.

import React, { useState, useMemo, ChangeEvent, CSSProperties } from 'react';
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
    list: {
      marginTop: theme.spacing(2),
      border: '1px solid #6d6d6d',
      borderRadius: 4,
    }
  }),
);

const message: string[] = [];

const Example =() => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const handleText = (event: ChangeEvent) => {
    setText((event.target as HTMLInputElement).value);
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
    console.log('List filtering...')
    return search
      ? longList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      : [];
  }, [search]);
  
  console.log('Component reloading...')

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
    </div>
  );
};

export default Example;
`;
