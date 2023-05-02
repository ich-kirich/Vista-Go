"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sights", [
      {
        id: 1,
        name: "Brandenburg Gate",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/brandenburg-gate.jpg",
        description:
          "The Brandenburg Gate is a famous architectural monument located in the center of Berlin, at the eastern end of Pariser Platz. Like the Colosseum in Rome, Big Ben in London, St. Stephen's Cathedral in Vienna or the Eiffel Tower in Paris, the Brandenburg Gate has long been the trademark of Berlin, the symbol of the united Germany and one of the main tourist attractions of the German capital.",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Kaiser Wilhelm Memorial Church",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/memorial-church.jpg",
        description:
          "The Kaiser Wilhelm Memorial Church is a famous landmark located in Berlin, Germany. The original church was built in the late 19th century in honor of Kaiser Wilhelm I, but was heavily damaged during World War II. The remains of the old church were preserved and a new modernist building was added next to it in the 1960s, creating a striking contrast between the old and the new. Today, the Kaiser Wilhelm Memorial Church serves as a memorial and a symbol of peace and reconciliation.",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Checkpoint Charlie",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/check-point-charlie.jpg",
        description:
          "Checkpoint Charlie was a famous border crossing point in Berlin, Germany during the Cold War. It was located on the intersection of Friedrichstraße and Zimmerstraße and served as a crossing point for allied military personnel, diplomats, and foreigners between the Soviet-controlled East Berlin and the Western part of the city. The checkpoint was named after the third letter of the NATO phonetic alphabet, 'Charlie'. It became a symbol of the divide between East and West during the Cold War and was the site of several tense standoffs between Soviet and American forces. Today, a replica of the guardhouse and a small museum stand at the site to commemorate its historical significance.",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Victory Column",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/berlin/victory-column.jpg",
        description:
          "The Victory Column, also known as the Berliner Siegessäule in German, is a famous monument located in Berlin, Germany. It was designed by Heinrich Strack and completed in 1873 to commemorate Prussia's victory over Denmark in the Second Schleswig War. Later, after Germany's unification, the monument was used to celebrate the country's military victories in the Austro-Prussian War and the Franco-Prussian War.",
        CityId: 1,
        RecommendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Fish market",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/fischmarkt.jpg",
        description:
          "The Fish Market in Hamburg, Germany is a famous open-air market that takes place every Sunday morning in the St. Pauli district, near the harbor. The market has a long history, dating back to the 16th century, and is a popular attraction for both locals and tourists.",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "International Maritime Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/international-maritime-museum.jpg",
        description:
          "The International Maritime Museum is located in Hamburg, Germany and is one of the largest maritime museums in the world. The museum is housed in an old brick warehouse in the historic Speicherstadt district, which was once the center of Hamburg's shipping industry.",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Hagenbeck Zoo",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/tierpark-hagenbeck.jpg",
        description:
          "The Hagenbeck Zoo, also known as Tierpark Hagenbeck, is a zoo located in Hamburg, Germany. The zoo was founded in 1907 by Carl Hagenbeck, a renowned animal trainer and dealer, and is known for its unique open-air enclosures that allow visitors to observe the animals in a natural habitat.",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Dialogue in the Dark Museum",
        image:
          "https://tripplanet.ru/wp-content/uploads/europe/germany/hamburg/dialogue-in-the-dark.jpg",
        description:
          "The Dialogue in the Dark Museum in Hamburg, Germany is a unique museum that offers visitors an immersive experience of what it's like to be blind. Visitors are led through a series of exhibits and interactive installations in complete darkness, accompanied by guides who are blind or visually impaired.",
        CityId: 2,
        RecommendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Minsk city hall",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/7626cf4c8cf8a3ae72b4f08befaed79d/",
        description:
          "The Minsk City Hall is the seat of the local government in Minsk, the capital city of Belarus. It is located in the center of the city on Independence Square and serves as the headquarters for the Minsk City Executive Committee, which is responsible for governing the city.",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Cathedral of the Blessed Virgin Mary",
        image:
          "https://cdn2.tu-tu.ru/image/pagetree_node_data/1/911233cfca0d4314998dc46a96ef4631/",
        description:
          "The Cathedral of the Blessed Virgin Mary in Minsk, also known as the Minsk Cathedral, is a Catholic church located in the heart of Minsk, the capital city of Belarus. The cathedral was built in the 17th century in the Baroque style and is considered to be one of the most important landmarks in Minsk.",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Gates of Minsk",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Babrujskaja%2C_Minsk.jpg/300px-Babrujskaja%2C_Minsk.jpg",
        description:
          "The Gates of Minsk, also known as the Minsk Gates, are a historic monument located in the capital city of Belarus, Minsk. The gates were built in the 17th century and are one of the few remaining architectural landmarks from the city's medieval period.",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "National Library of Belarus",
        image:
          "https://upload.wikimedia.org/wikipedia/ru/thumb/0/0e/BelarusNationalLibrary.JPG/290px-BelarusNationalLibrary.JPG",
        description:
          "The National Library of Belarus is the main library of the Republic of Belarus, located in the capital city of Minsk. It is one of the largest and most modern libraries in Europe and is known for its unique design and impressive collection of books and documents.",
        CityId: 3,
        RecommendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Old Castle",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/4498748/pub_630374203fda8341457af3b8_63037469ee54bf127b727b7b/scale_1200",
        description:
          "The Old Castle in Grodno is a historic landmark located in the city of Grodno, Belarus. The castle was built in the 11th century and served as the residence of the Grand Dukes of Lithuania and the Kings of Poland for several centuries.",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Great Choral Synagogue",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/5236269/pub_630374203fda8341457af3b8_6303751756792f4c4b5bdd5f/scale_1200",
        description:
          "The Great Choral Synagogue, also known as the New Synagogue, is a historic synagogue located in the city of Grodno, Belarus. The synagogue was built in the 19th century and is considered to be one of the most important landmarks of Jewish heritage in the country.",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Grodno State Museum of the History of Religion",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Museum_of_religion.JPG/274px-Museum_of_religion.JPG",
        description:
          "The Grodno State Museum of the History of Religion is a museum located in the city of Grodno, Belarus. The museum was established in 1994 and is dedicated to the study and preservation of the history of religion in Belarus.",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Zhiliber Park",
        image:
          "https://trippo.ru/wp-content/uploads/2021/12/Park-ZHilibera.jpg",
        description:
          "Zhiliber Park is a public park located in the city of Grodno, Belarus. The park is situated on the banks of the Neman River and covers an area of over 12 hectares. It is considered to be one of the most popular and scenic parks in Grodno.",
        CityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "Mugni Church",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-34.jpg",
        description:
          "The Holy Mother of God Katoghike Church, commonly known as the Mugni Church, is a historic Armenian Apostolic church located in the heart of Yerevan, the capital city of Armenia. The church was built in the 17th century and is considered to be one of the most important landmarks of Armenian culture and heritage in the city.",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Arjeni Winery",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-44.jpg",
        description:
          "The Ararat-Echmiadzin Winery, also known as the Arjeni Winery, is a winery located in Yerevan, the capital city of Armenia. The winery was established in 1953 and is one of the oldest and most famous wineries in Armenia.",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "Republic Square",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-1.jpg",
        description:
          "Republic Square is a central public square located in the heart of Yerevan, the capital city of Armenia. The square is one of the main landmarks of the city and is a popular destination for tourists and locals alike.",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "Yerevan Cascade",
        image:
          "https://blogtravel.by/wp-content/uploads/2021/10/dostoprimechatelnosty-yerevana-3.jpg",
        description:
          "The Yerevan Cascade is a massive staircase complex located in the capital city of Armenia, Yerevan. The Cascade is an architectural masterpiece that consists of a series of outdoor escalators and staircases, which lead up to a large plaza at the top of the complex.",
        CityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "Black Fortress",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/black-fortress.jpg",
        CityId: 6,
        description:
          "The Black Fortress, also known as the Sev Berd, is a historic fortress located in Gyumri, the second-largest city in Armenia. The fortress was built in the early 19th century by the Russian Empire as part of a defensive system against the Ottoman Empire.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "Vardanants Square",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/vardanants-square.jpg",
        description:
          "Vardanants Square is the central square of Gyumri, the second-largest city in Armenia. The square is named after the Battle of Avarayr, which took place in 451 AD and is considered a significant event in Armenian history.",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "Central Park",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/central-park.jpg",
        description:
          "Central Park is a public park located in the heart of Gyumri, the second-largest city in Armenia. The park is a popular destination for locals and visitors alike, offering a peaceful retreat from the hustle and bustle of city life.",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "Marmashen Monastery",
        image:
          "https://tripplanet.ru/wp-content/uploads/asia/armenia/gyumri/marmashen-monastery.jpg",
        description:
          "Marmashen Monastery is a historic Armenian monastery located near the city of Gyumri in the Shirak region of Armenia. The monastery was built in the 10th century and is considered one of the finest examples of Armenian medieval architecture.",
        CityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sights", null, {});
  },
};
