export const seed = function (knex) {
  return knex("rooms")
    .del()
    .then(function () {
      return knex("rooms").insert([
        { name: "Google", floor: 1, for_stuff: false },
        { name: "Facebook", floor: 2, for_stuff: false },
        { name: "Twitter", floor: 3, for_stuff: false },
        { name: "Github", floor: 1, for_stuff: true },
        { name: "Abutech", floor: 2, for_stuff: false },
        { name: "Faktor", floor: 3, for_stuff: false },
        { name: "Telegram", floor: 2, for_stuff: false },
        { name: "Netflix", floor: 1, for_stuff: false },
        { name: "Microsoft", floor: 2, for_stuff: false },
        { name: "Aliexpress", floor: 3, for_stuff: true },
      ]);
    });
};
