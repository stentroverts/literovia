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
  category: 'literary' | 'creative' | 'interactive' | 'performance';
  venue?: string;
  multiDay?: boolean; // New property to indicate events that span multiple days
}

export const eventsData: Event[] = [
  // Day 1 Events - September 8, 2025
  {
    id: 'slam-poetry',
    name: 'Slam Poetry',
    shortDescription: 'Share your voice, presence, and truth through powerful original poems that move audiences.',
    fullDescription: 'Take the stage with your original poems, using voice and presence to share powerful messages and personal stories. This event encourages creativity, bold expression, and honest storytelling that connects deeply with audiences.',
    date: 'September 8, 2025',
    time: '10:00 AM - 12:00 PM',
    day: 1,
    image: '/events/slam-poetry.png',
    category: 'performance',
    venue: 'Main Auditorium'
  },
  {
    id: 'literary-auction',
    name: 'Plot Bid',
    shortDescription: 'Outbid your rivals for story elements, then spin the wildest tale on the spot.',
    fullDescription: 'Bid for fictional characters and plot elements, then craft imaginative stories using your winning items on the spot. The highest bidders walk away with bragging rights and the power to weave the most creative tales.',
    date: 'September 8, 2025',
    time: '2:00 PM - 4:00 PM',
    day: 1,
    image: '/events/literary-auction.png',
    category: 'interactive',
    venue: 'Library Hall'
  },
  {
    id: 'bang-jam',
    name: 'Bang Jam',
    shortDescription: 'Speak non-stop for a minute on random prompts in this lightning-fast mic challenge.',
    fullDescription: 'Speak continuously for one minute without pausing or hesitating on random prompts in this fast-paced speaking challenge. Test your quick thinking and sharp speaking skills as the mic passes between participants with a bang.',
    date: 'September 8, 2025',
    time: '7:00 PM - 9:00 PM',
    day: 1,
    image: '/events/bang-jam.png',
    category: 'performance',
    venue: 'Open Stage Area'
  },
  {
    id: 'paperback-partners',
    name: 'Paperback Partners',
    shortDescription: 'Pair up with book lovers to chat, bond, and swap handmade bookmarks.',
    fullDescription: 'Get paired with fellow book lovers, share literary conversations, and create handmade bookmarks for each other. Everyone leaves with a handmade bookmark and wonderful memories of literary connection.',
    date: 'September 8, 2025',
    time: '11:00 AM - 12:30 PM',
    day: 1,
    image: '/events/paperback-partners.png',
    category: 'interactive',
    venue: 'Social Hub'
  },
  {
    id: 'sign-language-workshop',
    name: 'Sign Language',
    shortDescription: 'Learn the beauty of silent storytelling in this expressive sign language workshop.',
    fullDescription: 'In this introduction to sign language, discover how the loudest stories are sometimes told without sound, exploring new forms of expression. This workshop is perfect for those curious about new forms of communication, looking to pick up a unique skill, or wanting to explore the beauty of silent interaction.',
    date: 'September 8, 2025',
    time: '11:00 AM - 12:30 PM',
    day: 1,
    image: '/events/signlanguage-workshop.png',
    category: 'interactive',
    venue: 'Workshop Room B'
  },
  {
    id: 'performance-showcase',
    name: 'Mimic and Mystify',
    shortDescription: 'Laugh and gasp with mimicry legend Srinivos and illusionist Magician Ali.',
    fullDescription: 'Prepare to be mesmerized by the legendary Mimicry Srinivos, pioneer of sound illusion in India, showcasing unmatched   mimicry and ventriloquism. Joining him is the spellbinding Magician Ali, weaving mind-bending illusions and breathtaking tricks. Get ready for    laughs and wonder, capped off with a magical surprise.',
    date: 'September 8, 2025',
    time: '1:00 PM - 2:30 PM',
    day: 1,
    image: '/events/performance.png',
    category: 'performance',
    venue: 'Theater Stage'
  },
  // Day 2 Events - September 9, 2025
  {
    id: 'after-dinner-speech',
    name: 'P.S (Post Supper)',
    shortDescription: 'Deliver witty, theatrical after-dinner speeches with a dash of satire.',
    fullDescription: 'Take audiences on a whimsical ride of satire and storytelling with curated prompts. This British-style after-dinner speech format celebrates wit, theatrical flair, and creative reimagination.',
    date: 'September 9, 2025',
    time: '7:00 PM - 8:30 PM',
    day: 2,
    image: '/events/post-supper.png',
    category: 'literary',
    venue: 'Banquet Hall'
  },
  {
    id: 'lore-wars',
    name: 'Lore Wars',
    shortDescription: 'Duel in improvised storytelling using surprise characters, settings, and genres.',
    fullDescription: 'Battle in storytelling duels using assigned characters, settings, and genres to create original narratives. Perfect for quick thinkers, world-builders, and storytelling enthusiasts who love creative challenges.',
    date: 'September 9, 2025',
    time: '2:00 PM - 4:00 PM',
    day: 2,
    image: '/events/lore-wars.png',
    category: 'interactive',
    venue: 'Battle Arena (Main Hall)'
  },
  {
    id: 'spockle',
    name: 'Spockle',
    shortDescription: 'Debate absurd topics, then switch sides on command in this chaotic verbal battle.',
    fullDescription: 'Defend bizarre topics until "Switch!" forces you to argue the opposite stance in this chaotic debate format. Think fast and speak even faster in this unpredictable test of improvisation and persuasion.',
    date: 'September 9, 2025',
    time: '11:45 AM - 1:00 PM',
    day: 2,
    image: '/events/spockle.png',
    category: 'creative',
    venue: 'Story Circle'
  },
  {
    id: 'poem-interpretation',
    name: 'MetaphorA',
    shortDescription: 'Dive deep into poetry\'s meaning, emotion, and artistry through live interpretation.',
    fullDescription: 'Decode and present thoughtful interpretations of poetry, exploring meaning, emotions, and literary devices. This immersive event challenges participants to uncover the soul of poetry through expressive analysis.',
    date: 'September 9, 2025',
    time: '10:00 AM - 11:30 AM',
    day: 2,
    image: '/events/metaphora.png',
    category: 'literary',
    venue: 'Discussion Room B'
  },
  {
    id: 'panel-discussion',
    name: 'Between Reality and Imagination',
    shortDescription: 'Explore how literature bridges truth and creativity to inspire change.',
    fullDescription: 'Distinguished speakers explore how literature exists in the fascinating space between truth and creativity, reflecting real social conditions while expanding our vision of what could be. This thoughtful exchange examines how storytelling bridges the factual and fictional, helping society see itself more clearly while inspiring meaningful change. Join us for an engaging conversation about literature\'s power to both mirror reality and reshape our imagination.',
    date: 'September 9, 2025',
    time: '1:15 PM - 2:45 PM',
    day: 2,
    image: '/events/litnsociety.png',
    category: 'literary',
    venue: 'Conference Room'
  },
  // Arcade Event - Both Days
  {
    id: 'arcade',
    name: 'Arcade',
    shortDescription: 'Gaming extravaganza with classic and modern games for all skill levels.',
    fullDescription: 'Step into our gaming paradise featuring a mix of classic arcade games, modern console gaming, and interactive challenges. Whether you\'re a casual gamer or a competitive player, join us for non-stop entertainment across both days of the festival.',
    date: 'September 8-9, 2025',
    time: '9:00 AM - 5:00 PM (Both Days)',
    day: 1,
    image: '/events/Arcade.png',
    category: 'interactive',
    venue: 'Gaming Zone',
    multiDay: true
  },
  // Theater Event - Day 2
  {
    id: 'theater',
    name: 'Theater',
    shortDescription: 'Theatrical performances and drama showcase - details coming soon.',
    fullDescription: 'An exciting theatrical event featuring drama performances and stage presentations. Stay tuned for more details about this captivating showcase of dramatic arts and storytelling through performance.',
    date: 'September 9, 2025',
    time: 'TBA',
    day: 2,
    image: '/events/placeholder.svg',
    category: 'performance',
    venue: 'Theater Hall'
  }
];

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
