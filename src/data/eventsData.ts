// Event data structure for Literovia 2025
export interface Event {
  id: string;
  name: string;
  fullDescription: string;
  date: string;
  time: string;
  day: 1 | 2;
  image: string;
  category: 'literary' | 'creative' | 'interactive' | 'performance';
  venue?: string;
  duration?: string;
}

export const eventsData: Event[] = [
  // Day 1 Events - September 8, 2025
  {
    id: 'slam-poetry',
    name: 'Slam Poetry',
    fullDescription: 'Slam Poetry is an electrifying competitive event where participants perform original poems within a time limit, combining writing, performance, and audience engagement. This event showcases the power of spoken word as poets share personal stories, social commentary, and emotional experiences. Participants will be judged on content, style, and audience impact. Whether you\'re a seasoned poet or new to the art form, this is your chance to let your voice be heard and connect with others through the universal language of poetry.',
    date: 'September 8, 2025',
    time: '10:00 AM - 12:00 PM',
    day: 1,
    image: '/events/slam-poetry.png',
    category: 'performance',
    venue: 'Main Auditorium',
    duration: '2 hours'
  },
  {
    id: 'literary-auction',
    name: 'Literary Auction',
    fullDescription: 'The Literary Auction is a thrilling event where book enthusiasts can bid on rare first editions, signed manuscripts, vintage literary magazines, and unique book-related artifacts. This auction features carefully curated items from various genres and time periods. Participants can discover hidden gems, add to their personal collections, or find the perfect gift for fellow literature lovers. All proceeds support literacy programs and the Stentorians Club activities. Come prepared to compete for some truly extraordinary literary treasures!',
    date: 'September 8, 2025',
    time: '2:00 PM - 4:00 PM',
    day: 1,
    image: '/events/literary-auction.png',
    category: 'interactive',
    venue: 'Library Hall',
    duration: '2 hours'
  },
  {
    id: 'writing-workshop',
    name: 'Workshop',
    fullDescription: 'This intensive writing workshop is designed for aspiring writers of all levels. Led by published authors and experienced editors, participants will explore various writing techniques, narrative structures, and creative processes. The workshop covers character development, plot construction, dialogue writing, and editing strategies. Interactive exercises and group discussions will help you discover your unique voice and improve your craft. Bring your writing samples for personalized feedback and constructive criticism.',
    date: 'September 8, 2025',
    time: '4:30 PM - 6:30 PM',
    day: 1,
    image: '/events/writing-workshop.png',
    category: 'literary',
    venue: 'Workshop Room A',
    duration: '2 hours'
  },
  {
    id: 'bang-jam',
    name: 'BangJam',
    fullDescription: 'BangJam is an innovative fusion event that combines the rhythmic power of music with the expressive depth of literature. Musicians, poets, and storytellers collaborate to create unique performances that blur the lines between different art forms. Experience live music accompaniment to poetry readings, lyrical storytelling, and improvised musical narratives. This event celebrates the interconnectedness of artistic expression and offers audiences a multi-sensory literary experience unlike any other.',
    date: 'September 8, 2025',
    time: '7:00 PM - 9:00 PM',
    day: 1,
    image: '/events/bang-jam.png',
    category: 'performance',
    venue: 'Open Stage Area',
    duration: '2 hours'
  },
  {
    id: 'paperback-partners',
    name: 'Paperback Partners',
    fullDescription: 'Paperback Partners is a unique networking event designed to connect book enthusiasts based on their reading preferences and interests. Through fun icebreaker activities, book speed-dating sessions, and genre-based group discussions, participants can find like-minded readers to form book clubs, reading partnerships, or simply expand their literary social circle. Share your favorite reads, discover new recommendations, and build lasting friendships centered around your love for literature.',
    date: 'September 8, 2025',
    time: '11:00 AM - 12:30 PM',
    day: 1,
    image: '/events/paperback-partners.png',
    category: 'interactive',
    venue: 'Social Hub',
    duration: '1.5 hours'
  },
  {
    id: 'performance-showcase',
    name: 'Performance',
    fullDescription: 'The Performance Showcase features dramatic interpretations of classic and contemporary literature by talented student actors and performers. Watch as beloved characters from novels, plays, and short stories come to life through monologues, scene recreations, and creative adaptations. This event highlights the theatrical elements inherent in great literature and demonstrates how written words can transform into powerful live performances. Enjoy everything from Shakespearean soliloquies to modern literary adaptations.',
    date: 'September 8, 2025',
    time: '1:00 PM - 2:30 PM',
    day: 1,
    image: '/events/performance.png',
    category: 'performance',
    venue: 'Theater Stage',
    duration: '1.5 hours'
  },
  {
    id: 'geoguesser',
    name: 'GeoGuesser',
    fullDescription: 'GeoGuesser Literary Edition combines geographical knowledge with literary trivia in an engaging quiz format. Participants will identify locations from famous novels, trace the journeys of literary characters, and guess settings based on descriptive passages from books. This interactive competition tests both your geographical awareness and literary knowledge while exploring how authors use setting to enhance their narratives. Teams compete through multiple rounds of increasing difficulty for exciting prizes.',
    date: 'September 8, 2025',
    time: '3:00 PM - 4:00 PM',
    day: 1,
    image: '/events/geoguesser.png',
    category: 'interactive',
    venue: 'Quiz Hall',
    duration: '1 hour'
  },
  {
    id: 'nyt-mini-games',
    name: 'NY Times Mini Games',
    fullDescription: 'Enjoy a collection of popular New York Times puzzle games including crosswords, word games, and brain teasers with a literary twist. This event features specially curated puzzles that incorporate literary terms, author names, book titles, and famous quotes. Participants can compete individually or in teams to solve crosswords, word searches, and logic puzzles within time limits. Perfect for word game enthusiasts and anyone who enjoys mental challenges with a literary flavor.',
    date: 'September 8, 2025',
    time: '5:00 PM - 6:00 PM',
    day: 1,
    image: '/events/nyt-games.png',
    category: 'interactive',
    venue: 'Game Room',
    duration: '1 hour'
  },

  // Day 2 Events - September 9, 2025
  {
    id: 'poem-interpretation',
    name: 'Poem Interpretation',
    fullDescription: 'Poem Interpretation is an analytical and creative event where participants delve deep into the layers of meaning within selected poems. Through guided discussion, literary analysis techniques, and creative interpretation methods, participants explore themes, imagery, symbolism, and poetic devices. This event encourages both academic analysis and personal reflection, allowing participants to share their unique perspectives on how poetry speaks to them. Expect engaging discussions about form, content, and the emotional impact of carefully chosen poems.',
    date: 'September 9, 2025',
    time: '10:00 AM - 11:30 AM',
    day: 2,
    image: '/events/poem-interpretation.png',
    category: 'literary',
    venue: 'Discussion Room B',
    duration: '1.5 hours'
  },
  {
    id: 'lore-wars',
    name: 'LoreWars',
    fullDescription: 'LoreWars is the ultimate literary battle where teams compete in various rounds testing their knowledge of books, authors, literary history, and storytelling skills. This epic competition includes rapid-fire trivia, creative storytelling challenges, character identification rounds, and plot twist competitions. Teams must demonstrate not only their breadth of literary knowledge but also their ability to think creatively and work collaboratively under pressure. The ultimate test for true literature enthusiasts!',
    date: 'September 9, 2025',
    time: '2:00 PM - 4:00 PM',
    day: 2,
    image: '/events/lore-wars.png',
    category: 'interactive',
    venue: 'Battle Arena (Main Hall)',
    duration: '2 hours'
  },
  {
    id: 'spockle',
    name: 'Spockle',
    fullDescription: 'Spockle is an innovative storytelling format that combines elements of spoken word poetry, interactive narrative, and audience participation. Participants take turns building a collaborative story, with each person adding their own creative twist while maintaining narrative coherence. This dynamic event encourages spontaneity, creativity, and active listening as stories evolve in unexpected directions. Experience the magic of collective creativity as individual voices merge to create something entirely new and captivating.',
    date: 'September 9, 2025',
    time: '11:45 AM - 1:00 PM',
    day: 2,
    image: '/events/spockle.png',
    category: 'creative',
    venue: 'Story Circle',
    duration: '1.25 hours'
  },
  {
    id: 'theatre-performance',
    name: 'Theatre',
    fullDescription: 'The Theatre event showcases full-scale dramatic performances adapted from literary works. Watch as talented actors bring beloved characters and scenes from novels, short stories, and plays to life through professional-quality theatrical presentations. These performances highlight the dramatic potential within literature and demonstrate the seamless transition from page to stage. Experience the power of live theater as literature transforms into dynamic, engaging performances that capture the essence of great storytelling.',
    date: 'September 9, 2025',
    time: '4:30 PM - 6:00 PM',
    day: 2,
    image: '/events/theatre.png',
    category: 'performance',
    venue: 'Main Theater',
    duration: '1.5 hours'
  },
  {
    id: 'after-dinner-speech',
    name: 'After Dinner Speech',
    fullDescription: 'The After Dinner Speech event features inspiring presentations from established authors, literary critics, publishers, and industry professionals. These engaging talks cover various aspects of the literary world, from the creative writing process and publishing industry insights to the cultural impact of literature. Speakers share their experiences, wisdom, and perspectives on current trends in literature and writing. This is an excellent opportunity to gain valuable insights from those who have made significant contributions to the literary community.',
    date: 'September 9, 2025',
    time: '7:00 PM - 8:30 PM',
    day: 2,
    image: '/events/after-dinner-speech.png',
    category: 'literary',
    venue: 'Banquet Hall',
    duration: '1.5 hours'
  },
  {
    id: 'panel-discussion',
    name: 'Panel Discussion',
    fullDescription: 'The Panel Discussion brings together a diverse group of literary professionals including authors, editors, publishers, and academics to discuss pressing topics in the literary world. Panelists explore current trends in publishing, the future of literature in the digital age, diversity in literary voices, and the evolving relationship between readers and writers. The session includes audience Q&A, providing attendees with opportunities to engage directly with industry experts and gain insights into the contemporary literary landscape.',
    date: 'September 9, 2025',
    time: '1:15 PM - 2:45 PM',
    day: 2,
    image: '/events/panel-discussion.png',
    category: 'literary',
    venue: 'Conference Room',
    duration: '1.5 hours'
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    fullDescription: 'Change My Mind is a structured debate event focusing on controversial topics in literature and literary criticism. Participants engage in respectful but spirited discussions on topics such as "Classic literature is overrated," "Digital books will replace physical books," or "Author intent doesn\'t matter in interpretation." This event encourages critical thinking, persuasive argumentation, and the ability to consider multiple perspectives. Participants must support their arguments with evidence while remaining open to having their minds changed by compelling counterarguments.',
    date: 'September 9, 2025',
    time: '3:00 PM - 4:15 PM',
    day: 2,
    image: '/events/change-my-mind.png',
    category: 'interactive',
    venue: 'Debate Hall',
    duration: '1.25 hours'
  },
  {
    id: 'hot-takes-arena',
    name: 'Hot Takes Arena',
    fullDescription: 'Hot Takes Arena is where literary controversy meets passionate discussion! Participants present their most unpopular or controversial opinions about books, authors, literary movements, or industry trends. From "Harry Potter is overrated" to "Poetry is dying as an art form," no topic is off-limits as long as it\'s presented respectfully. This event celebrates diverse perspectives and encourages participants to think critically about widely accepted literary norms. Prepare to defend your position and hear viewpoints that might challenge your literary worldview!',
    date: 'September 9, 2025',
    time: '6:15 PM - 7:30 PM',
    day: 2,
    image: '/events/hot-takes.png',
    category: 'interactive',
    venue: 'Debate Arena',
    duration: '1.25 hours'
  }
];

// Helper functions
export const getEventById = (id: string): Event | undefined => {
  return eventsData.find(event => event.id === id);
};

export const getEventsByDay = (day: 1 | 2): Event[] => {
  return eventsData.filter(event => event.day === day);
};

export const getEventsByCategory = (category: Event['category']): Event[] => {
  return eventsData.filter(event => event.category === category);
};
