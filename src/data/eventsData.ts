// Event data structure for Literovia 2025
export interface Event {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  time: string;
  day: 1 | 2;
  image: string;
  category: 'speaking' | 'writing' | 'interactive' | 'workshop' | 'performance' | 'panel-discussion' | 'fun-events';
  venue?: string;
  multiDay?: boolean; // New property to indicate events that span multiple days
  teamSize: number; // Team size for the event
}

export const eventsData: Event[] = [
  // Day 1 Events - September 8, 2025
  {
    id: 'slam-poetry',
    name: 'Slam Poetry',
    shortDescription: 'Performance-based poetry event where participants present original poems expressing emotions and stories.',
    fullDescription: 'Slam Poetry is a performance-based poetry event where participants present their own original poems on stage. It focuses on expressing strong emotions, personal stories, and powerful messages through voice and presence. Each performance is judged based on the poem\'s content, delivery, emotional impact, and how well it connects with the audience. This event encourages creativity, bold expression, and honest story telling.',
    date: 'September 8, 2025',
    time: '10:00 AM - 4:00 PM',
    day: 1,
    image: '/events/slam-poetry.png',
    category: 'speaking',
    venue: 'A-013',
    teamSize: 1
  },
  {
    id: 'literary-auction',
    name: 'Plot Bid',
    shortDescription: 'Bid for fictional characters, objects, and plot twists, then craft imaginative stories on the spot.',
    fullDescription: 'In this one-of-a-kind auction, participants will bid for fictional characters, objects, and plot twists. Once the bids are in, it\'s time to craft a story using the elements you\'ve won. The highest bidders don\'t just walk away with bragging rights but with the power to weave the most imaginative tales on the spot.',
    date: 'September 8, 2025',
    time: '10:00 AM - 4:00 PM',
    day: 1,
    image: '/events/literary-auction.png',
    category: 'writing',
    venue: 'E-219, E-239',
    teamSize: 2
  },
  {
    id: 'bang-jam',
    name: 'Bang Jam',
    shortDescription: 'Speak continuously for one minute on random prompts without pausing or hesitating.',
    fullDescription: 'The player will be given a random prompt and must speak continuously without pausing, hesitating, or making grammatical errors. The goal is to accumulate one full minute of uninterrupted speech. If the player slips up, the mic is immediately passed to the next participant, who picks up the challenge. It is fast-paced, unpredictable, and tests both quick thinking and sharp speaking.',
    date: 'September 8, 2025',
    time: '11:00 AM - 4:00 PM',
    day: 1,
    image: '/events/bang-jam.png',
    category: 'speaking',
    venue: 'E-004',
    teamSize: 1
  },
  {
    id: 'paperback-partners',
    name: 'Paperback Partners',
    shortDescription: 'Get paired based on favorite books to chat and make handmade bookmarks for each other.',
    fullDescription: 'Paperback Partners is an event where students get paired up to talk about books and make bookmarks for each other. It is casual, fun, and full of conversations. People are matched based on the book they select as their favourite. Some people meet for the first time, some find common reads, and everyone leaves with a handmade bookmark and a good memory.',
    date: 'September 8, 2025',
    time: '11:00 AM - 4:00 PM',
    day: 1,
    image: '/events/paperback-partners.png',
    category: 'interactive',
    venue: 'SAC Stage ',
    teamSize: 1
  },
  {
    id: 'sign-language-workshop',
    name: 'Sign Language',
    shortDescription: 'Learn to communicate through hands, expressions, and gestures in this silent storytelling workshop.',
    fullDescription: 'Participants will be introduced to the basics of sign language and learn how to communicate using only their hands, expressions, and gestures. The workshop focuses on helping you understand how stories and emotions can be conveyed without spoken words. It\'s perfect for those curious about new forms of expression, looking to pick up a unique skill, or wanting to explore the beauty of silent communication. You\'ll leave knowing that sometimes, the loudest stories are the ones told without sound.',
    date: 'September 8, 2025',
    time: '10:00 AM - 1:00 PM',
    day: 1,
    image: '/events/signlanguage-workshop.png',
    category: 'workshop',
    venue: 'B Block Seminar Hall',
    teamSize: 1
  },
  {
    id: 'performance-showcase',
    name: 'Mimic and Mystify',
    shortDescription: 'Laugh and gasp with mimicry legend Srinivos and illusionist Magician Ali.',
    fullDescription: 'Prepare to be mesmerized by the legendary Mimicry Srinivos, pioneer of sound illusion in India, showcasing unmatched   mimicry and ventriloquism. Joining him is the spellbinding Magician Ali, weaving mind-bending illusions and breathtaking tricks. Get ready for    laughs and wonder, capped off with a magical surprise.',
    date: 'September 8, 2025',
    time: '1:40 PM - 4:40 PM',
    day: 1,
    image: '/events/performance.png',
    category: 'performance',
    venue: 'KS Auditorium',
    teamSize: 1
  },
  // Day 2 Events - September 9, 2025
  {
    id: 'after-dinner-speech',
    name: 'P.S (Post Supper)',
    shortDescription: 'Solo speaking event featuring witty reimagination with curated prompts and theatrical flair.',
    fullDescription: 'This solo speaking event is all about the witty deliverance of reimagination. The participants pick a curated prompt along with a persona, and are given a constraint of time to prep before they take us on a whimsical ride of satire, storytelling, and theatrical flair. Whether the prompt is to imagine Oscar Wilde navigating online dating, or venting about the existential crisis of an unread book, the aim is to entertain, and exaggerate with a spark of originality, while being evaluated on the same.',
    date: 'September 9, 2025',
    time: '10:00 AM - 4:00 PM',
    day: 2,
    image: '/events/post-supper.png',
    category: 'speaking',
    venue: 'E-219',
    teamSize: 1
  },
  {
    id: 'lore-wars',
    name: 'Lore Wars',
    shortDescription: 'Create short stories using assigned characters, settings, and genres in head-to-head story battles.',
    fullDescription: 'Participants will be given a set of characters, settings, and genres which are either chosen or assigned. Using these elements, each player must create a short story, weaving them together creatively and coherently. Players go head-to-head in a story-off, where their narratives are judged based on originality, consistency, adherence to given elements and delivery. Ideal for quick thinkers, world-builders, and storytelling enthusiasts.',
    date: 'September 9, 2025',
    time: '10:00 AM - 4:00 PM',
    day: 2,
    image: '/events/lore-wars.png',
    category: 'writing',
    venue: 'A-013',
    teamSize: 1
  },
  {
    id: 'spockle',
    name: 'Spockle',
    shortDescription: 'Argue bizarre topics, then switch sides or pass the mic on command in this chaotic debate.',
    fullDescription: 'Players are handed a fun or bizarre topic and must argue either for or against it at the host\'s command. At any moment, the host can flip the stance or pass the mic to the next participant. When the host says "Switch!", the mic is then passed to the next player who continues this chaos. It is extremely fast-paced, unpredictable and chaotic. It is perfect for those who love improv, debates, or just making chaos sound convincing. The players need to speak fast, and think even faster.',
    date: 'September 9, 2025',
    time: 'TBA',
    day: 2,
    image: '/events/spockle.png',
    category: 'speaking',
    venue: 'TBA',
    teamSize: 1
  },
  {
    id: 'poem-interpretation',
    name: 'MetaphorA',
    shortDescription: 'Decode and present thoughtful interpretations of poetry, exploring meaning and literary devices.',
    fullDescription: 'Poem Interpretation is an immersive event that challenges participants to decode the soul of poetry. A place to express the meaning, emotions, and literary brilliance woven into each verse. Participants will select a poem (either provided on the spot or chosen in advance) and present a thoughtful, expressive interpretation that explores the poet\'s intent, emotional undertones, context, and literary devices. Judged on insight, clarity, emotional depth, and delivery, this event blends oration, literature, and critical thinking.',
    date: 'September 9, 2025',
    time: 'TBA',
    day: 2,
    image: '/events/metaphora.png',
    category: 'writing',
    venue: 'TBA',
    teamSize: 1
  },
  {
    id: 'panel-discussion',
    name: 'Between Reality and Imagination',
    shortDescription: 'Distinguished speakers share perspectives on literature, writing styles, and Stentorian values.',
    fullDescription: 'A distinguished panel of speakers will engage in a thoughtful exchange of ideas, sharing their perspectives on their favorite works of literature, writing styles, and everything else that defines Stentorian. The panelists include Venkatesh Maha and Jhilam Chattaraj.',
    date: 'September 9, 2025',
    time: '1:00 PM onwards',
    day: 2,
    image: '/events/litnsociety.png',
    category: 'panel-discussion',
    venue: 'B Block Seminar Hall',
    teamSize: 1
  },
  // Arcade Events - Both Days (Separate Events)
  {
    id: 'arcade-day1',
    name: 'Arcade',
    shortDescription: 'NY Times mini games and Jeopardy trivia challenges for puzzle lovers and word game fans.',
    fullDescription: 'NY Times mini games - Players will participate in a series of small, fun sized challenges inspired by New York Times classics like Wordle, Spelling Bee, Connections, Mini Crossword, Tiles, and more. Each player will attempt the games, moving from one to the next as per the guidelines. Perfect for puzzle lovers, word game fans. Jeopardy- Jeopardy is a trivia game where participants answer questions from a wide range of topics such as movies, music, sports, history, science, pop culture, and more. Players earn points for every correct answer, and those who score 500 points get to play a one-minute rapid fire round for a final challenge.',
    date: 'September 8, 2025',
    time: '9:00 AM - 4:40 PM',
    day: 1,
    image: '/events/Arcade.png',
    category: 'fun-events',
    venue: 'TBA',
    teamSize: 1
  },
  {
    id: 'arcade-day2',
    name: 'Arcade',
    shortDescription: 'Change My Mind persuasion challenges and Eclectica word puzzles from art and pop culture.',
    fullDescription: 'Change my mind - Change My Mind is not just to simply speak convincingly, but to take it a step further and have the OC exclaim that you have indeed changed his/her mind. It is to master the art of manipulation where you will be put to the test with a very quirky and controversial topic and you will have to be devil\'s advocate to change the OC\'s mind regarding the topic. Eclectica - Eclectica is a fun word game in which each player will be given a card, which has a quirky puzzle drawn from topics like art, pop culture, idioms, and more. The challenge is to solve the statements, rearrange the sounds and figure out the word before anyone else.',
    date: 'September 9, 2025',
    time: '9:00 AM - 4:40 PM',
    day: 2,
    image: '/events/Arcade.png',
    category: 'fun-events',
    venue: 'TBA',
    teamSize: 1
  }
];

// Category color mapping
export const getCategoryColor = (category: Event['category']): string => {
  const categoryColors = {
    'speaking': '#3B82F6',        // Blue - Professional and trustworthy
    'writing': '#8B5CF6',         // Purple - Creative and imaginative  
    'interactive': '#10B981',     // Green - Engaging and active
    'workshop': '#F59E0B',        // Orange - Educational and warm
    'performance': '#EF4444',     // Red - Energetic and exciting
    'panel-discussion': '#6B7280', // Gray - Intellectual and formal
    'fun-events': '#EC4899'       // Pink - Fun and playful
  };
  
  return categoryColors[category] || '#6B7280'; // Default to gray
};

// Helper functions
export const getEventById = (id: string): Event | undefined => {
  return eventsData.find(event => event.id === id);
};

export const getEventsByDay = (day: 1 | 2): Event[] => {
  return eventsData.filter(event => event.day === day || event.multiDay === true);
};

export const getEventsByCategory = (category: Event['category']): Event[] => {
  return eventsData.filter(event => event.category === category);
};
