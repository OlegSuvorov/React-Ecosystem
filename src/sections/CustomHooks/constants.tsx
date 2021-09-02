export const codeString =
` //  Пользовательские хуки — это механизм повторного использования логики с состоянием (например, установка подписки и 
 //  сохранение текущего значения), но каждый раз, когда вы используете пользовательский хук, всё состояние и эффекты 
 //  внутри него полностью изолированы.
 // 
 //  В процессе написания React-приложений часто происходит так, что одна и та же повторяющая и избыточная логика 
 //  состояний из раза в раз кочует между несколькими компонентами. С помощью собственных хуков можно разделить эту 
 //  логику на функции, чтобы сделать код более читабельным и многоразовым.
 // 
 //  Пользовательские хуки являются функциями, охватывающими другие хуки и содержащими общую логику состояний, которую 
 //  можно вновь использовать в других компонентах. Такие функции закреплены за префиксным словом use. Они позволяют 
 //  делать код короче и чище.
 // 
 //  Прежде чем писать собственный React-хук, следует иметь в виду, что сообщество React уже опубликовало тысячи разных 
 //  вариантов. Велика вероятность того, что хук с нужной вам логикой уже был написан и опубликован в сети.

// --------------------- Пользовательский хук -------------------------

export const useFetch = (initialUrl: string, initialOptions = {}): any => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    url && fetchData();
  }, [url, options]);
  return ({data, error, isLoading, setUrl, setOptions});
};

// --------------------- Компонент -------------------------

const url = 'https://rickandmortyapi.com/api/character/';

const fields = [
  'Name',
  'Species',
  'Status',
]

const actions = [
  { name: 'Rick', id: '1' },
  { name: 'Morty', id: '2' },
  { name: 'Error', id: 'error' },
]

const Example = () => {
  const classes = useStyles();

  const { data, error, isLoading, setUrl } = useFetch('');

  const handleClick = (id: string) => () => setUrl(\`$\{url}\${id}\`);
  const fetchError = error || data?.error;

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        {data && !fetchError &&
          <Card className={classes.card}>
          <div>
            <CardMedia
              className={classes.image}
              image={data?.image}
            />
          </div>
          <Grid container spacing={2}>
            {fields.map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  className={classes.card}
                  key={field}
                >
                  <Grid item xs={3}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className={classes.grid}
                    >
                      {field}:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className={classes.grid}
                    >
                      {data?.[field.toLowerCase()]}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        </Card>}
        {fetchError && (
          <Typography
            variant="h4"
            gutterBottom
            align="left"
            className={classes.error}
          >
            {fetchError}
          </Typography>
        )}
      </Grid>
      <Grid
        className={classes.actions}
        item
        xs={12}
        sm={12}
      >
        <Card className={classes.card}>
          {actions.map(({ id, name }) => (
            <Button
              key={name}
              className={classes.btn}
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleClick(id)}
            >
              Get {name}
            </Button>
          ))}
        </Card>
      </Grid>
    </div>
  );
};
`;
