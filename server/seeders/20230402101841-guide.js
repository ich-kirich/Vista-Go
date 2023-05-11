"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("guides", [
      {
        id: 1,
        name: "Andrey Medvedik",
        image:
          "https://sun9-46.userapi.com/impg/bDcJoqmnwZpzwLc-IECcREcYS0B89VXEKyMzxQ/0GKr3f4JB8A.jpg?size=400x400&quality=95&sign=51bc517f02df15bf197c5b20c84701a5&type=album",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Stepan Naymkin",
        image:
          "https://sun9-80.userapi.com/impg/Pt7HWGkk_FAGTlDI5i6nJIb72Qq9xzHmWVgtVw/1M24R8bUAhk.jpg?size=1200x1600&quality=96&sign=227d56fceee4e0deff1b268c0cdb65d8&type=album",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Anna Kravchenko",
        image:
          "https://mobimg.b-cdn.net/v3/fetch/ea/eaa626bfeedf4b90cb715b2c5b311477.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Olga Levchenko",
        image:
          "https://get.pxhere.com/photo/man-person-people-woman-photography-male-portrait-spring-facial-expression-smile-senior-citizen-cool-image-eye-glasses-head-skin-beauty-emotion-portrait-photography-vision-care-209032.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Maria Schmidt",
        image:
          "https://get.pxhere.com/photo/person-people-girl-woman-hair-photography-portrait-model-spring-child-lady-facial-expression-season-smile-face-dress-eye-head-skin-beauty-blond-emotion-photo-shoot-brown-hair-portrait-photography-151299.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Jan Mueller",
        image: "http://cdn1.flamp.ru/a992cfb02dd71b2dc22b2f577067ddd8.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Lena Wagner",
        image:
          "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=797592037303700",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Max Schulz",
        image:
          "https://psychologie-seminar.com/____impro/1/onewebmedia/Young%20happy%20man%20smiling%20at%20camera%20in%20the%20grape%20fields.jpg?etag=&sourceContentType=&ignoreAspectRatio&resize=1200%2B800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Mark Arutyunyan",
        image:
          "https://get.pxhere.com/photo/man-person-hair-male-sadness-portrait-human-hairstyle-beard-close-up-face-loneliness-eye-head-stand-alone-portrait-photography-facial-hair-aycuma-1363432.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Artur Avetisyan",
        image:
          "https://get.pxhere.com/photo/man-nature-person-people-male-portrait-human-close-smile-senior-citizen-face-head-out-grandparent-facial-hair-720070.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Narek Arutyunyan",
        image:
          "https://mysekret.ru/wp-content/uploads/2022/01/warren-wong-vvewjjrrhgk-unsplash.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "Angela Abramyan",
        image:
          "https://get.pxhere.com/photo/person-people-girl-woman-photography-portrait-young-youth-student-healthy-facial-expression-smiling-smile-teenager-caucasian-beauty-teeth-teen-attractive-emotion-photo-shoot-brown-hair-portrait-photography-1391382.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("guides", null, {});
  },
};
