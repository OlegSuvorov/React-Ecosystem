export const codeString =
` //  Один из примеров недостатков языка JavaScript — это его подход к выполнению большого объема вычислений. 
 //  В большинстве современных систем программирования подобные задачи выполняются незаметно в фоновом режиме, позволяя 
 //  пользователю продолжать работать над другими аспектами задачи. Но код JavaScript всегда исполняется на переднем плане. 
 //  Поэтому любые трудоемкие вычисления прерывают выполнение всех других задач на странице, вынуждая пользователя ожидать 
 //  их завершения. Игнорирование этой проблемы выльется вам в определенное количество очень недовольных посетителей, 
 //  покинувших вашу страницу с твердым намерением больше на нее не возвращаться.
 //  Изобретательные веб-разработчики нашли несколько частичных решений данной проблемы. Эти решения основаны на разбиении 
 //  долговременных задач на несколько меньших частей и исполнении этих частей по одной с помощью метода setInternval() или setTimeout().
 //  Для некоторых типов задач это решение работает хорошо (например, это практичный способ для анимирования содержимого холста). 
 //  Но если нужно выполнить одну очень долгую операцию безостановочно от начала до конца, этот метод порождает сложность 
 //  и неразбериху.
 //  Спецификация HTML5 предлагает лучшее решение в виде специализированного объекта, называющегося потоком (web worker), 
 //  предназначенного для выполнения фоновых вычислений. Для выполнения долговременной задачи мы создаем новый поток, даем ему 
 //  необходимый код и запускаем его выполнять поставленную задачу. В процессе выполнения потоком своей задачи с ним можно 
 //  безопасно поддерживать ограниченное взаимодействие посредством текстовых сообщений.

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useWorker } from "web-worker-hooks";
import { WorkerPostMessage, WorkerSetOnMessage } from "web-worker-hooks/build/main/core/core";

let time = 0;

const Example = () => {
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
    console.log(\`Calculation time: \${new Date().getTime() - time}\`);
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
            { \`Result: \${result}\` }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Example;
`;
