export const codeString =
` // Хук useCallback возвращает мемоизированный колбэк, который будет обновлен, 
 // только если одна из зависимостей будет изменена.
 // Это полезно при передаче колбэков оптимизированным дочерним компонентам, которые 
 // полагаются на равенство ссылок для предотвращения ненужных рендеров 
 // (например, shouldComponentUpdate или memo).

import React, { useState, ChangeEvent, memo, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Child = (
  {
    childName,
    changeName,
  }: {
    childName: string;
    changeName: Function;
  }) => {
  const [name, setName] = useState('');
  const classes = useStyles();
  
  useEffect(() => {
    console.log(\`$\{childName} reloading...\`);
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
            {\`$\{childName} child\`}
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

const Example = () => {
  const classes = useStyles();
  const [usual, setUsual] = useState('Usual');
  const [memo, setMemo] = useState('Memo');
  
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
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <MemoChild
          childName={memo}
          changeName={memoSetMemo}
        />
      </Grid>
    </div>
  );
};

export default Example;
`;
