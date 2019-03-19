exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jokes').del()
  .then(function () {
    // Inserts seed entries
    return knex('jokes').insert([
      {
        id: 1,
        author: 'Shaggy',
        title: 'Scooby and the Gangs secret',
        body: 'You like, better knock it off before I make your disappearance the gangs next mystery.',
        imagePublicId: 'seeds/seed_shaggy'
      },
      {
        id: 2,
        author: 'Blaine',
        title: 'Rainbow 6 Siege Hijinx',
        body: 'knock knock, KGB OPEN UP!',
        imagePublicId: 'seeds/seed_fuze_kgb'
      },
      {
        id: 3,
        author: 'Unknown',
        title: 'A great ancient philosophy',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePublicId: 'seeds/seed_aristotle'
      },
      {
        id: 4,
        author: 'Geo Brawn IV',
        title: 'Everdance, A Blood Story',
        body: 'When Kate fell in love with Andre, an ancient vampire drawn to her mortality, she never pictured a world without him. Following his demise, she s left with no way to survive. That s when a mysterious immortal comes out of the darkness with a deal for Kate. One that shapes the once innocent Kate into something darker than she ever imagined, the world s first crime biter.',
        imagePublicId: 'seeds/graphic_novel_everdance'
      },
      {
        id: 5,
        author: 'Geo Brawn IV',
        title: 'Blood Rites',
        body: 'Party all night, sleep all day… seemed like the perfect life to a wild teen party-girl. But when gwen was then recruited into the secret team that is blood rites, she had no idea how much her life was really about to change as she enters a world of ghosts, werewolves, demons and monsters of all kinds… becoming cherry bomb, gwen was about to learn that the line between good and evil was not always so black and white. And with kat to train her, she was about to go on the ride of a lifetime… and beyond.',
        imagePublicId: 'seeds/graphic_novel_bloodrites'
      },
      {
        id: 6,
        author: 'Geo Brawn IV',
        title: 'Rosabelle & The Constant State Of Death',
        body: 'Her name is rosabelle… she’s been alive since the civil war era, and how she does it, is both a blessing and a curse. She has wealth, beauty and all that goes with it… but the cost is to feed of the humans she stalks. Living as zombie is not easy, living to stay young and beautiful, well for rosabelle and her vanity, nothing could be finer.Can anyone stop this undead man-eater?',
        imagePublicId: 'seeds/graphic_novel_rosabelle'
      },
      {
        id: 7,
        author: 'Geo Brawn IV',
        title: 'Midnight Angel',
        body: 'What if an angel fell in love with a mortal for the first time and instead of guiding her soul from her body, saves her life and in turn falls from grace..? And what if this was only the beginning of their story? Marekiel fought on the side of light during the war for heaven, his loyalty remained strong, until he saw erica for the first time. She changed everything…  and now this one-time angel is now just like you and me… accept before his great fall, he created the first nephilim in centuries. But then before finding out he’s a father, she leaves her savior… now, after five painful years, and unless he protects the woman he loves and his young son, the world will know a darkness unlike ever before. Can marekiel still be the midnight angel? ',
        imagePublicId: 'seeds/graphic_novel_afterfall'
      }
    ]);
  });
};
