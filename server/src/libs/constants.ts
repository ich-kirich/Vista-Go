import { JsonDB, Config } from "node-json-db";

export const DATA = [
  {
    id: 1,
    country: "Germany",
    name: "Berlin",
    weather: "Unknown",
    image:
      "https://sportishka.com/uploads/posts/2022-04/1650714007_66-sportishka-com-p-berlin-krasivo-foto-70.jpg",
    sights: [
      {
        id: 1,
        name: "Brandenburg Gate",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/brandenburg-gate.jpg",
        tags: ["Landmark", "Architecture", "History"],
      },
      {
        id: 2,
        name: "Kaiser Wilhelm Memorial Church",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/memorial-church.jpg",
        tags: ["Religion", "Empire", "History"],
      },
      {
        id: 3,
        name: "Checkpoint Charlie",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/check-point-charlie.jpg",
        tags: ["Checkpoint", "Berlin Wall", "History"],
      },
      {
        id: 4,
        name: "Victory Column",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/victory-column.jpg",
        tags: ["Column", "Victory", "History"],
      },
    ],
  },
  {
    id: 2,
    country: "Germany",
    name: "Hamburg",
    weather: "Unknown",
    image:
      "https://sportishka.com/uploads/posts/2022-04/1650611081_25-sportishka-com-p-gamburg-dostoprimechatelnosti-krasivo-foto-26.jpg",
    sights: [
      {
        id: 1,
        name: "Fish market",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/fischmarkt.jpg",
        tags: ["Fish", "Market", "Meal"],
      },
      {
        id: 2,
        name: "International Maritime Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/international-maritime-museum.jpg",
        tags: ["Sea", "Museum", "History"],
      },
      {
        id: 3,
        name: "Hagenbeck Zoo",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/tierpark-hagenbeck.jpg",
        tags: ["Zoo", "Animals", "Science"],
      },
      {
        id: 4,
        name: "Dialogue in the Dark Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/dialogue-in-the-dark.jpg",
        tags: ["Life", "Museum", "Science"],
      },
    ],
  },
  {
    id: 3,
    country: "Belarus",
    name: "Minsk",
    weather: "Unknown",
    image: "https://photoclub.by/images/main81/812183_main.jpg",
    sights: [
      {
        id: 1,
        name: "Minsk city hall",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/7626cf4c8cf8a3ae72b4f08befaed79d/",
        tags: ["Hall", "Administration", "History"],
      },
      {
        id: 2,
        name: "Cathedral of the Blessed Virgin Mary",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/911233cfca0d4314998dc46a96ef4631/",
        tags: ["Religion", "Architecture", "History"],
      },
      {
        id: 3,
        name: "Gates of Minsk",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Babrujskaja%2C_Minsk.jpg/300px-Babrujskaja%2C_Minsk.jpg",
        tags: ["Gates", "Architecture", "History"],
      },
      {
        id: 4,
        name: "National Library of Belarus",
        image:
          "https://upload.wikimedia.org/wikipedia/ru/thumb/0/0e/BelarusNationalLibrary.JPG/290px-BelarusNationalLibrary.JPG",
        tags: ["Library", "Architecture", "Science"],
      },
    ],
  },
  {
    id: 4,
    name: "Grodno",
    country: "Belarus",
    weather: "Unknown",
    image:
      "https://sportishka.com/uploads/posts/2022-04/1650476989_8-sportishka-com-p-grodno-dostoprimechatelnosti-krasivo-foto-9.jpg",
    sights: [
      {
        id: 1,
        name: "Old Castle",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/4498748/pub_630374203fda8341457af3b8_63037469ee54bf127b727b7b/scale_1200",
        tags: ["Castle", "The Middle Ages", "History"],
      },
      {
        id: 2,
        name: "Great Choral Synagogue",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/5236269/pub_630374203fda8341457af3b8_6303751756792f4c4b5bdd5f/scale_1200",
        tags: ["Religion", "Architecture", "History"],
      },
      {
        id: 3,
        name: "Grodno State Museum of the History of Religion",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Museum_of_religion.JPG/274px-Museum_of_religion.JPG",
        tags: ["Religion", "Museum", "History"],
      },
      {
        id: 4,
        name: "Zhiliber Park",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%B0_%282018%29._%D0%9F%D0%B0%D1%80%D0%BA_%D0%96%D1%8B%D0%BB%D1%96%D0%B1%D0%B5%D1%80%D0%B0_07.jpg/280px-%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%B0_%282018%29._%D0%9F%D0%B0%D1%80%D0%BA_%D0%96%D1%8B%D0%BB%D1%96%D0%B1%D0%B5%D1%80%D0%B0_07.jpg",
        tags: ["Park", "Nature", "History"],
      },
    ],
  },
  {
    id: 5,
    country: "Armenia",
    name: "Yerevan",
    weather: "Unknown",
    image: "http://www.lagunaspb.ru/assets/galleries/293/2.jpg",
    sights: [
      {
        id: 1,
        name: "Mugni Church",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-34.jpg",
        tags: ["Religion", "Architecture", "History"],
      },
      {
        id: 2,
        name: "Arjeni Winery",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-44.jpg",
        tags: ["Winery", "Architecture", "Wine"],
      },
      {
        id: 3,
        name: "Republic Square",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-1.jpg",
        tags: ["Square", "Architecture", "History"],
      },
      {
        id: 4,
        name: "Yerevan Cascade",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-3.jpg",
        tags: ["Beauty", "Architecture", "History"],
      },
    ],
  },
  {
    id: 6,
    name: "Gyumri",
    country: "Armenia",
    weather: "Unknown",
    image:
      "https://sun9-6.userapi.com/impg/fUqPeckfxo0tDfTgjAMkFH8YIjlo6Rh2zbYlFg/b529nnCd6Sw.jpg?size=960x590&quality=95&sign=65df9285ba0b911175531a8870716948&c_uniq_tag=co1AB-0WXRucKvIMEydpCSCOiGrfRdH2rPA2rlQMfjM&type=album",
    sights: [
      {
        id: 1,
        name: "Black Fortress",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/black-fortress.jpg",
        tags: ["Fortress", "Architecture", "History"],
      },
      {
        id: 2,
        name: "Vardanants Square",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/vardanants-square.jpg",
        tags: ["Square", "Architecture", "History"],
      },
      {
        id: 3,
        name: "Central Park",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/central-park.jpg",
        tags: ["Park", "Architecture", "Nature"],
      },
      {
        id: 4,
        name: "Marmashen Monastery",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/marmashen-monastery.jpg",
        tags: ["Religion", "Architecture", "History"],
      },
    ],
  },
];

export const db = new JsonDB(new Config("myDataBase", true, false, "/"));
