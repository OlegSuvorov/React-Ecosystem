export const codeString =
` /**
 * Если ваше приложение рендерит длинные списки данных (сотни или тысячи строк), 
 * мы рекомендуем использовать метод известный как «оконный доступ». Этот метод 
 * рендерит только небольшое подмножество строк в данный момент времени и может 
 * значительно сократить время, необходимое для повторного рендера компонентов, а 
 * также количество создаваемых DOM-узлов.
 * react-window — это популярная библиотека для оконного доступа. Она предоставляют 
 * несколько повторно используемых компонентов для отображения списков, сеток и табличных
 * данных
 */
interface AbstractFactory {
    createProductA(): AbstractProductA;

    createProductB(): AbstractProductB;
}

/**
 * Конкретная Фабрика производит семейство продуктов
 * одной вариации. Фабрика гарантирует совместимость полученных
 * продуктов.
 * Обратите внимание, что сигнатуры методов Конкретной Фабрики
 * возвращают абстрактный продукт, в то время как внутри метода
 * создается экземпляр конкретного продукта.
 */
class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

/**
 * Каждая Конкретная Фабрика имеет соответствующую 
 * вариацию продукта
 */
class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

/**
 * Каждый отдельный продукт семейства продуктов должен иметь
 * базовый интерфейс. 
 * Все вариации продукта должны реализовывать этот интерфейс.
 */
interface AbstractProductA {
    usefulFunctionA(): string;
}

/**
 * Эти Конкретные Продукты создаются соответствующими
 * Конкретными Фабриками.
 */
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
}

/**
 * Базовый интерфейс другого продукта. Все продукты могут 
 * взаимодействовать друг с другом, но правильное взаимодействие 
 * возможно только между продуктами одной и той же конкретной 
 * вариации.
 */
interface AbstractProductB {
    /**
     * Продукт B способен работать самостоятельно...
     */
    usefulFunctionB(): string;

    /**
     * ...а также взаимодействовать с Продуктами A той же вариации.
     *
     * Абстрактная Фабрика гарантирует, что все продукты, которые 
     * она создает, имеют одинаковую вариацию и, следовательно, 
     * совместимы.
     */
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * Эти Конкретные Продукты создаются соответствующими Конкретными 
 * Фабриками.
 */
class ConcreteProductB1 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }

    /**
     * Продукт B1 может корректно работать только с Продуктом A1. 
     * Тем не менее, он принимает любой экземпляр 
     * Абстрактного Продукта А в качестве аргумента.
     */
    public anotherUsefulFunctionB(
    collaborator: AbstractProductA,
    ): string {
        const result = collaborator.usefulFunctionA();
        return 
        \`The result of the B1 collaborating with the ($\{result})\`;
    }
}

class ConcreteProductB2 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    /**
     * Продукт B2 может корректно работать только с Продуктом A2.
     * Тем не менее, он принимает любой экземпляр Абстрактного
     * Продукта А в качествеаргумента.
     */
    public anotherUsefulFunctionB(
    collaborator: AbstractProductA,
    ): string {
        const result = collaborator.usefulFunctionA();
        return 
        \`The result of the B2 collaborating with the ($\{result})\`;
    }
}
  `;

export const description = [
  `Абстрактная фабрика (англ. Abstract factory) — порождающий шаблон проектирования,
   предоставляет интерфейс для создания семейств взаимосвязанных или взаимозависимых объектов, 
   не специфицируя их конкретных классов`,
  `Шаблон реализуется созданием абстрактного класса Factory, который представляет собой интерфейс для создания 
  компонентов системы (например, для оконного интерфейса он может создавать окна и кнопки). 
  Затем пишутся классы, реализующие этот интерфейс`,
  `Абстрактная фабрика задаёт интерфейс создания всех доступных типов продуктов, а каждая конкретная реализация
   фабрики порождает продукты одной из вариаций.`,
  `Клиентский код вызывает методы фабрики для получения продуктов, вместо самостоятельного создания с помощью оператора
   'new'. При этом фабрика сама следит за тем, чтобы создать продукт нужной вариации.`,
  `Плюсы:`,
  ` - изолирует конкретные классы;`,
  ` - упрощает замену семейств продуктов;`,
  ` - гарантирует сочетаемость продуктов;`,
  `Минусы:`,
  ` - сложно добавить поддержку нового вида продуктов;`,
  `Применение:`,
  ` - система не должна зависеть от того, как создаются, компонуются и представляются входящие в неё объекты;`,
  ` - входящие в семейство взаимосвязанные объекты должны использоваться вместе и вам необходимо обеспечить выполнение 
      этого ограничения;`,
  ` - система должна конфигурироваться одним из семейств составляющих её объектов;`,
  ` - требуется предоставить библиотеку объектов, раскрывая только их интерфейсы, но не реализацию;`,
];
