import { QueryInterface } from "sequelize";

const prepareTranslations = (en: string, ru: string) => {
  if (en.length > 2048 || ru.length > 2048) {
    throw new Error(
      `Description exceeds 2048 characters limit. EN length: ${en.length}, RU length: ${ru.length}`,
    );
  }
  return { en, ru };
};

export default {
  up: async (queryInterface: QueryInterface) => {
    const sights = [
      {
        name: prepareTranslations("Brandenburg Gate", "Бранденбургские ворота"),
        image: "https://i.ibb.co/4nM5s1PV/brandenburg-gate.png",
        description: prepareTranslations(
          "The Brandenburg Gate is an 18th-century neoclassical monument in Berlin, built on the orders of Prussian king Frederick William II after the successful restoration of order during the early Batavian Revolution. One of the best-known landmarks of Germany, it was built on the site of a former city gate that marked the start of the road from Berlin to the town of Brandenburg an der Havel.",
          "Бранденбургские ворота — архитектурный памятник в центре Берлина в районе Митте. Возведены в 1788—1791 годах по проекту архитектора Карла Готтхарда Лангганса. Являются символом объединённой Германии и одной из самых узнаваемых достопримечательностей страны.",
        ),
        lat: 52.516272,
        lon: 13.377722,
        CityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "Kaiser Wilhelm Memorial Church",
          "Мемориальная церковь кайзера Вильгельма",
        ),
        image: "https://i.ibb.co/1JmpGjmP/kaiser-wilhelm-memorial-church.png",
        description: prepareTranslations(
          "The Kaiser Wilhelm Memorial Church is a Protestant church affiliated with the Evangelical Church in Berlin. The original church on the site was built in the 1890s. It was badly damaged in a bombing raid in 1943. The present building, which consists of a church with an attached foyer and a separate belfry with an attached chapel, was built between 1959 and 1963.",
          "Мемориальная церковь кайзера Вильгельма — протестантская церковь в Берлине на площади Брайтшайдплац. Первоначальное здание было построено в 1890-х годах, сильно повреждено при бомбардировке в 1943 году. Современный мемориальный комплекс был возведён в 1959-1963 годах.",
        ),
        lat: 52.509997,
        lon: 13.335,
        CityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Checkpoint Charlie", "КПП Чарли"),
        image: "https://i.ibb.co/RpRCn4Wq/checkpoint-charlie.png",
        description: prepareTranslations(
          "Checkpoint Charlie was the best-known Berlin Wall crossing point between East Berlin and West Berlin during the Cold War. It became a symbol of the Cold War, representing the separation of East and West. Soviet and American tanks briefly faced each other at the location during the Berlin Crisis of 1961.",
          "КПП Чарли — самый известный пропускной пункт Берлинской стены между Восточным и Западным Берлином во время холодной войны. Стал символом противостояния Востока и Запада. В 1961 году здесь произошло танковое противостояние между советскими и американскими войсками.",
        ),
        lat: 52.5075,
        lon: 13.39,
        CityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Victory Column", "Колонна Победы"),
        image: "https://i.ibb.co/LDFn7qyC/victory-column.png",
        description: prepareTranslations(
          "The Victory Column, also known as the Berliner Siegessäule in German, is a famous monument located in Berlin, Germany. It was designed by Heinrich Strack and completed in 1873 to commemorate Prussia's victory over Denmark in the Second Schleswig War. Later, after Germany's unification, the monument was used to celebrate the country's military victories in the Austro-Prussian War and the Franco-Prussian War.",
          "Колонна Победы, также известная как Berliner Siegessäule на немецком языке, - знаменитый памятник, расположенный в Берлине, Германия. Он был спроектирован Генрихом Штраком и построен в 1873 году в честь победы Пруссии над Данией во Второй Шлезвигской войне. Позже, после объединения Германии, памятник использовался для празднования военных побед страны в Австро-прусской и Франко-прусской войнах.",
        ),
        lat: 52.514444,
        lon: 13.35,
        CityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Fish Market", "Рыбный рынок"),
        image: "https://i.ibb.co/Kz0HXDh8/fish-market.png",
        description: prepareTranslations(
          "The Hamburg Fish Market is located in the Altona district and is a traditional market that has existed since 1703. Every Sunday morning, thousands of visitors come to buy fresh fish, fruits, vegetables and other goods. The market is also known for its lively atmosphere with music and entertainment.",
          "Гамбургский рыбный рынок расположен в районе Альтона и существует с 1703 года. Каждое воскресное утро тысячи посетителей приходят сюда за свежей рыбой, фруктами, овощами и другими товарами. Рынок также известен своей оживлённой атмосферой с музыкой и развлечениями.",
        ),
        lat: 53.549444,
        lon: 9.966667,
        CityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "International Maritime Museum",
          "Международный морской музей",
        ),
        image: "https://i.ibb.co/7tdXLv9m/international-maritime-museum.png",
        description: prepareTranslations(
          "The International Maritime Museum Hamburg is a private museum located in the HafenCity quarter. It opened in 2008 and presents over 3,000 years of maritime history across nine floors with more than 40,000 exhibits and over one million photographs. The museum is housed in the historic Kaispeicher B warehouse built in 1878.",
          "Международный морской музей в Гамбурге — частный музей в районе Хафенсити. Открыт в 2008 году, представляет более 3000 лет морской истории на девяти этажах с более чем 40 000 экспонатов. Музей расположен в историческом здании склада Кайшпайхер B, построенном в 1878 году.",
        ),
        lat: 53.541667,
        lon: 10.003889,
        CityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Hagenbeck Zoo", "Зоопарк Хагенбек"),
        image: "https://i.ibb.co/5hqyJBqv/hagenbeck-zoo.png",
        description: prepareTranslations(
          "The Hagenbeck Zoo, also known as Tierpark Hagenbeck, is a zoo located in Hamburg, Germany. The zoo was founded in 1907 by Carl Hagenbeck, a renowned animal trainer and dealer, and is known for its unique open-air enclosures that allow visitors to observe the animals in a natural habitat.",
          "Зоопарк Хагенбека, также известный как Тирпарк Хагенбека, - это зоопарк, расположенный в Гамбурге, Германия. Зоопарк был основан в 1907 году Карлом Хагенбеком, известным дрессировщиком и торговцем животными, и известен своими уникальными вольерами под открытым небом, позволяющими посетителям наблюдать за животными в естественной среде обитания.",
        ),
        lat: 53.596667,
        lon: 9.953333,
        CityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "Dialogue in the Dark Museum",
          "Диалог в темном музее",
        ),
        image: "https://i.ibb.co/j9JnYdRS/dialogue-dark-museum.png",
        description: prepareTranslations(
          "The Dialogue in the Dark Museum in Hamburg, Germany is a unique museum that offers visitors an immersive experience of what it's like to be blind. Visitors are led through a series of exhibits and interactive installations in complete darkness, accompanied by guides who are blind or visually impaired.",
          "Музей «Диалог в темноте» в Гамбурге (Германия) - это уникальный музей, который предлагает посетителям погрузиться в мир слепоты. Посетители проходят через ряд экспонатов и интерактивных инсталляций в полной темноте в сопровождении слепых или слабовидящих гидов.",
        ),
        lat: 53.552222,
        lon: 9.993333,
        CityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Minsk city hall", "Минская ратуша"),
        image: "https://i.ibb.co/v67BdDMp/minsk-city-hall.png",
        description: prepareTranslations(
          "The Minsk City Hall is the seat of the local government in Minsk, the capital city of Belarus. It is located in the center of the city on Independence Square and serves as the headquarters for the Minsk City Executive Committee, which is responsible for governing the city.",
          "Минская ратуша является резиденцией местных органов власти в Минске, столице Беларуси. Она расположена в центре города на площади Независимости и служит штаб-квартирой Минского городского исполнительного комитета, который отвечает за управление городом.",
        ),
        lat: 53.902222,
        lon: 27.561667,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "Cathedral of the Blessed Virgin Mary",
          "Собор Пресвятой Девы Марии",
        ),
        image: "https://i.ibb.co/cS6jyKqM/cathedral-blessed-virgin-mary.png",
        description: prepareTranslations(
          "The Cathedral of the Blessed Virgin Mary in Minsk, also known as the Minsk Cathedral, is a Catholic church located in the heart of Minsk, the capital city of Belarus. The cathedral was built in the 17th century in the Baroque style and is considered to be one of the most important landmarks in Minsk.",
          "Кафедральный собор Пресвятой Девы Марии в Минске, также известный как Минский собор, - это католический храм, расположенный в самом центре Минска, столицы Беларуси. Собор был построен в XVII веке в стиле барокко и считается одной из самых важных достопримечательностей Минска.",
        ),
        lat: 53.905,
        lon: 27.55,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Gates of Minsk", "Ворота Минска"),
        image: "https://i.ibb.co/jkMsDffs/gates-minsk.png",
        description: prepareTranslations(
          "The Gates of Minsk, also known as the Minsk Gates, are a historic monument located in the capital city of Belarus, Minsk. The gates were built in the 17th century and are one of the few remaining architectural landmarks from the city's medieval period.",
          "Минские ворота, являются историческим памятником, расположенным в столице Беларуси, Минске. Ворота были построены в XVII веке и являются одной из немногих сохранившихся архитектурных достопримечательностей средневекового города.",
        ),
        lat: 53.896667,
        lon: 27.55,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "National Library of Belarus",
          "Национальная библиотека Беларуси",
        ),
        image: "https://i.ibb.co/q6H4qgs/library-belarus.png",
        description: prepareTranslations(
          "The National Library of Belarus is the largest library in the Republic of Belarus. The library building is a rhombicuboctahedron 72.6 meters high with 23 floors. The library has a collection of over 10 million items in various media. At night, its facades turn into a giant LED screen displaying various patterns and advertisements.",
          "Национальная библиотека Беларуси — крупнейшая библиотека в Республике Беларусь. Здание имеет форму ромбокубооктаэдра высотой 72,6 метра с 23 этажами. В библиотеке хранится более 10 миллионов экземпляров различных медиа. Ночью фасады превращаются в гигантский LED-экран.",
        ),
        lat: 53.9275,
        lon: 27.6375,
        CityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Republic Square", "Площадь Республики"),
        image: "https://i.ibb.co/YTWrynSJ/republic-square.png",
        description: prepareTranslations(
          "Republic Square is the central town square in Yerevan. The square was designed by architect Alexander Tamanian in 1924. The construction of most of the buildings was completed by the 1950s. The square is surrounded by five major buildings built with pink and yellow tufa stone in neoclassical style with Armenian motifs.",
          "Площадь Республики — центральная площадь Еревана. Спроектирована архитектором Александром Таманяном в 1924 году. Большинство зданий было построено к 1950-м годам. Площадь окружена пятью зданиями из розового и жёлтого туфа в неоклассическом стиле с армянскими мотивами.",
        ),
        lat: 40.179167,
        lon: 44.513333,
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Old Castle", "Старый замок"),
        image: "https://i.ibb.co/B5bq2ds8/old-castle.png",
        description: prepareTranslations(
          "The Old Castle in Grodno is a historic landmark located in the city of Grodno, Belarus. The castle was built in the 11th century and served as the residence of the Grand Dukes of Lithuania and the Kings of Poland for several centuries.",
          "Старый замок в Гродно - историческая достопримечательность, расположенная в городе Гродно, Беларусь. Замок был построен в XI веке и на протяжении нескольких столетий служил резиденцией великих князей литовских и королей польских.",
        ),
        lat: 53.683333,
        lon: 23.833333,
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "Great Choral Synagogue",
          "Большая хоральная синагога",
        ),
        image: "https://i.ibb.co/fYNwN1dz/choral-synagogue.png",
        description: prepareTranslations(
          "The Great Choral Synagogue, also known as the New Synagogue, is a historic synagogue located in the city of Grodno, Belarus. The synagogue was built in the 19th century and is considered to be one of the most important landmarks of Jewish heritage in the country.",
          "Большая хоральная синагога, также известная как Новая синагога, - историческая синагога, расположенная в городе Гродно, Беларусь. Синагога была построена в XIX веке и считается одной из важнейших достопримечательностей еврейского наследия в стране.",
        ),
        lat: 53.68,
        lon: 23.83,
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations(
          "Grodno State Museum of the History of Religion",
          "Гродненский государственный музей истории религии",
        ),
        image: "https://i.ibb.co/k2nfGRZV/museum-history-religion.png",
        description: prepareTranslations(
          "The Grodno State Museum of the History of Religion is a museum located in the city of Grodno, Belarus. The museum was established in 1994 and is dedicated to the study and preservation of the history of religion in Belarus.",
          "Гродненский государственный музей истории религии - это музей, расположенный в городе Гродно, Беларусь. Музей был основан в 1994 году и занимается изучением и сохранением истории религии в Беларуси.",
        ),
        lat: 53.683333,
        lon: 23.836667,
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Zhiliber Park", "Парк Жилибера"),
        image: "https://i.ibb.co/bRzmd8H0/zhiliber-park.png",
        description: prepareTranslations(
          "Zhiliber Park is a public park located in the city of Grodno, Belarus. The park is situated on the banks of the Neman River and covers an area of over 12 hectares. It is considered to be one of the most popular and scenic parks in Grodno.",
          "Парк Жилибера - общественный парк, расположенный в городе Гродно, Беларусь. Он считается одним из самых популярных и живописных парков Гродно.",
        ),
        lat: 53.676667,
        lon: 23.833333,
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Mugni Church", "Церковь Мугни"),
        image: "https://i.ibb.co/3mmPGMBj/mugni-church.png",
        description: prepareTranslations(
          "The Holy Mother of God Katoghike Church, commonly known as the Mugni Church, is a historic Armenian Apostolic church located in the heart of Yerevan, the capital city of Armenia. The church was built in the 17th century and is considered to be one of the most important landmarks of Armenian culture and heritage in the city.",
          "Церковь Святой Богородицы Катогике, широко известная как церковь Мугни, - это историческая армянская апостольская церковь, расположенная в самом центре Еревана, столицы Армении. Церковь была построена в XVII веке и считается одной из самых важных достопримечательностей армянской культуры и наследия в городе.",
        ),
        lat: 40.265556,
        lon: 44.375556,
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Arjeni Winery", "Винодельня Арджени"),
        image: "https://i.ibb.co/1tygWL7B/arjeni-winery.png",
        description: prepareTranslations(
          "The Ararat-Echmiadzin Winery, also known as the Arjeni Winery, is a winery located in Yerevan, the capital city of Armenia. The winery was established in 1953 and is one of the oldest and most famous wineries in Armenia.",
          "Арарат-Эчмиадзинский винзавод, также известный как Ардженинский винзавод, - это винодельческое предприятие, расположенное в Ереване, столице Армении. Винодельня была основана в 1953 году и является одной из старейших и самых известных виноделен Армении.",
        ),
        lat: 40.145,
        lon: 44.455,
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Republic Square", "Республиканская площадь"),
        image: "https://i.ibb.co/YTWrynSJ/republic-square.png",
        description: prepareTranslations(
          "Republic Square is a central public square located in the heart of Yerevan, the capital city of Armenia. The square is one of the main landmarks of the city and is a popular destination for tourists and locals alike.",
          "Площадь Республики - это центральная общественная площадь, расположенная в самом сердце Еревана, столицы Армении. Площадь является одной из главных достопримечательностей города и популярным местом для посещения как туристами, так и местными жителями.",
        ),
        lat: 40.179167,
        lon: 44.513333,
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Yerevan Cascade", "Каскад (Ереван)"),
        image: "https://i.ibb.co/B2mSgn12/yerevan-cascade.png",
        description: prepareTranslations(
          "The Cascade is a giant stairway in Yerevan. It links the downtown Kentron area of Yerevan with the Monument neighborhood. Designed by architects Jim Torosyan, Aslan Mkhitaryan and Sargis Gurzadyan, the construction was started in 1971 and partially completed in 1980. The exterior was fully completed by 2009.",
          "Каскад — гигантская лестница в Ереване, соединяющая центр города с районом Памятника. Спроектирована архитекторами Джимом Торосяном, Асланом Мхитаряном и Саркисом Гурзадяном. Строительство началось в 1971 году, полностью завершено в 2009 году.",
        ),
        lat: 40.185,
        lon: 44.516667,
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Black Fortress", "Чёрная крепость"),
        image: "https://i.ibb.co/7thnkj3S/black-fortress.png",
        CityId: 6,
        description: prepareTranslations(
          "The Black Fortress, also known as the Sev Berd, is a historic fortress located in Gyumri, the second-largest city in Armenia. The fortress was built in the early 19th century by the Russian Empire as part of a defensive system against the Ottoman Empire.",
          "Черная крепость, также известная как Сев Берд, - историческая крепость, расположенная в Гюмри, втором по величине городе Армении. Крепость была построена в начале XIX века Российской империей как часть оборонительной системы против Османской империи.",
        ),
        lat: 40.788889,
        lon: 43.848889,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Vardanants Square", "Площадь Вардананц"),
        image: "https://i.ibb.co/cKJ8FJRy/vardanants-square.png",
        description: prepareTranslations(
          "Vardanants Square is the central square of Gyumri, the second-largest city in Armenia. The square is named after the Battle of Avarayr, which took place in 451 AD and is considered a significant event in Armenian history.",
          "Площадь Вардананц - центральная площадь Гюмри, второго по величине города Армении. Площадь названа в честь Аварайрской битвы, которая произошла в 451 году нашей эры и считается важным событием в истории Армении.",
        ),
        lat: 40.79,
        lon: 43.846667,
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Central Park", "Центральный парк"),
        image: "https://i.ibb.co/YFc5PpcD/central-park.png",
        description: prepareTranslations(
          "Central Park is a public park located in the heart of Gyumri, the second-largest city in Armenia. The park is a popular destination for locals and visitors alike, offering a peaceful retreat from the hustle and bustle of city life.",
          "Центральный парк - это общественный парк, расположенный в самом центре Гюмри, второго по величине города Армении. Парк является популярным местом отдыха как для местных жителей, так и для приезжих, предлагая спокойное уединение от городской суеты.",
        ),
        lat: 40.791667,
        lon: 43.836667,
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: prepareTranslations("Marmashen Monastery", "Монастырь Мармашен"),
        image: "https://i.ibb.co/nN79DqWH/marmashen-monastery.png",
        description: prepareTranslations(
          "Marmashen Monastery is a historic Armenian monastery located near the city of Gyumri in the Shirak region of Armenia. The monastery was built in the 10th century and is considered one of the finest examples of Armenian medieval architecture.",
          "Монастырь Мармашен - исторический армянский монастырь, расположенный недалеко от города Гюмри в Ширакской области Армении. Монастырь был построен в X веке и считается одним из лучших образцов армянской средневековой архитектуры.",
        ),
        lat: 40.69,
        lon: 43.76,
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const preparedSights = sights.map((sight) => ({
      ...sight,
      name: JSON.stringify(sight.name),
      description: JSON.stringify(sight.description),
    }));

    await queryInterface.bulkInsert("sights", preparedSights);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("sights", null, {});
  },
};
