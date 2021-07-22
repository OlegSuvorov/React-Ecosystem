export const codeString =
` //  Если ваше приложение рендерит длинные списки данных (сотни или тысячи строк), 
 //  мы рекомендуем использовать метод известный как «оконный доступ». Этот метод 
 //  рендерит только небольшое подмножество строк в данный момент времени и может 
 //  значительно сократить время, необходимое для повторного рендера компонентов, а 
 //  также количество создаваемых DOM-узлов.
 //  react-window — это популярная библиотека для оконного доступа. Она предоставляют 
 //  несколько повторно используемых компонентов для отображения списков, сеток и табличных
 //  данных
 
import { FixedSizeList as List } from 'react-window';
import { longList } from '../../generatedData/generatedList';

const handleClick = (row: Record<string, string>) => () => {
    console.log(\`id: \${row.id}, name: \${row.name}\`);
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

const Example = () => (
  <List
    height={300}
    itemCount={longList.length}
    itemSize={35}
    width={'100%'}
  >
    {Row}
  </List>
);
`;
