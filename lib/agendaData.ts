export interface Session {
  id: string;
  title: string;
  subtitle: string;
  speaker: string;
  time: string;
  date: string;
  track: 'Tech' | 'Design' | 'Business' | 'Workshop';
  description: string;
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
}

export const sessions: Session[] = [
  {
    id: '1',
    title: 'The Future of AI in Enterprise',
    subtitle: 'Transforming Business Operations with Machine Learning',
    speaker: 'J. Rosam',
    time: '09:00 - 09:45',
    date: '2025-10-15',
    track: 'Tech',
    description: 'Explore how artificial intelligence is revolutionizing enterprise workflows and decision-making processes.',
    reactions: { thumbsUp: 24, thumbsDown: 2, heart: 45 }
  },
  {
    id: '2',
    title: 'Design Systems at Scale',
    subtitle: 'Building Consistent User Experiences',
    speaker: 'A. Schmidt',
    time: '09:00 - 09:45',
    date: '2025-10-15',
    track: 'Design',
    description: 'Learn strategies for creating and maintaining design systems that scale across large organizations.',
    reactions: { thumbsUp: 18, thumbsDown: 1, heart: 32 }
  },
  {
    id: '3',
    title: 'Blockchain Beyond Crypto',
    subtitle: 'Real-World Applications in Supply Chain',
    speaker: 'M. Chen',
    time: '10:00 - 10:45',
    date: '2025-10-15',
    track: 'Tech',
    description: 'Discover how blockchain technology is solving real business problems beyond cryptocurrency.',
    reactions: { thumbsUp: 31, thumbsDown: 5, heart: 28 }
  },
  {
    id: '4',
    title: 'Strategic Leadership in Digital Age',
    subtitle: 'Navigating Change and Innovation',
    speaker: 'K. Müller',
    time: '10:00 - 10:45',
    date: '2025-10-15',
    track: 'Business',
    description: 'Essential leadership strategies for driving digital transformation in modern organizations.',
    reactions: { thumbsUp: 22, thumbsDown: 3, heart: 19 }
  },
  {
    id: '5',
    title: 'Hands-On: React Server Components',
    subtitle: 'Building Modern Web Applications',
    speaker: 'L. Weber',
    time: '11:00 - 12:00',
    date: '2025-10-15',
    track: 'Workshop',
    description: 'Interactive workshop on implementing React Server Components in production applications.',
    reactions: { thumbsUp: 42, thumbsDown: 1, heart: 67 }
  },
  {
    id: '6',
    title: 'UX Research Methods',
    subtitle: 'Data-Driven Design Decisions',
    speaker: 'S. Wagner',
    time: '11:00 - 11:45',
    date: '2025-10-15',
    track: 'Design',
    description: 'Practical techniques for conducting user research that informs product design.',
    reactions: { thumbsUp: 27, thumbsDown: 2, heart: 38 }
  },
  {
    id: '7',
    title: 'Sustainable Tech Practices',
    subtitle: 'Green Computing for the Future',
    speaker: 'T. Hoffmann',
    time: '13:00 - 13:45',
    date: '2025-10-15',
    track: 'Tech',
    description: 'Implementing environmentally sustainable practices in software development and infrastructure.',
    reactions: { thumbsUp: 35, thumbsDown: 4, heart: 41 }
  },
  {
    id: '8',
    title: 'Customer-Centric Innovation',
    subtitle: 'Building Products Users Love',
    speaker: 'R. Fischer',
    time: '13:00 - 13:45',
    date: '2025-10-15',
    track: 'Business',
    description: 'Strategies for placing customer needs at the center of product development.',
    reactions: { thumbsUp: 29, thumbsDown: 3, heart: 34 }
  },
  {
    id: '9',
    title: 'Motion Design Principles',
    subtitle: 'Creating Delightful Micro-interactions',
    speaker: 'E. Becker',
    time: '14:00 - 14:45',
    date: '2025-10-15',
    track: 'Design',
    description: 'Master the art of motion design to enhance user experience through thoughtful animations.',
    reactions: { thumbsUp: 38, thumbsDown: 2, heart: 52 }
  },
  {
    id: '10',
    title: 'Cloud Architecture Patterns',
    subtitle: 'Scalable and Resilient Systems',
    speaker: 'N. Schneider',
    time: '14:00 - 14:45',
    date: '2025-10-15',
    track: 'Tech',
    description: 'Explore proven patterns for building cloud-native applications that scale.',
    reactions: { thumbsUp: 33, thumbsDown: 1, heart: 29 }
  },
  {
    id: '11',
    title: 'Data Privacy & Ethics',
    subtitle: 'Building Trust in Digital Products',
    speaker: 'P. Zimmermann',
    time: '15:00 - 15:45',
    date: '2025-10-15',
    track: 'Business',
    description: 'Understanding the importance of data privacy and ethical considerations in product development.',
    reactions: { thumbsUp: 26, thumbsDown: 2, heart: 23 }
  },
  {
    id: '12',
    title: 'Accessibility First Design',
    subtitle: 'Creating Inclusive Digital Experiences',
    speaker: 'I. Braun',
    time: '15:00 - 15:45',
    date: '2025-10-15',
    track: 'Design',
    description: 'Learn how to design and build products that are accessible to everyone from the start.',
    reactions: { thumbsUp: 44, thumbsDown: 1, heart: 58 }
  },
  {
    id: '13',
    title: 'DevOps Best Practices',
    subtitle: 'Continuous Integration and Deployment',
    speaker: 'F. Krause',
    time: '16:00 - 16:45',
    date: '2025-10-15',
    track: 'Tech',
    description: 'Modern DevOps practices for faster, more reliable software delivery.',
    reactions: { thumbsUp: 37, thumbsDown: 3, heart: 31 }
  },
  {
    id: '14',
    title: 'Building Remote Teams',
    subtitle: 'Culture and Communication Strategies',
    speaker: 'C. Lehmann',
    time: '16:00 - 16:45',
    date: '2025-10-15',
    track: 'Business',
    description: 'Best practices for creating effective and engaged remote-first teams.',
    reactions: { thumbsUp: 30, thumbsDown: 4, heart: 27 }
  },
  {
    id: '15',
    title: 'Panel: The Future of Work',
    subtitle: 'AI, Automation, and Human Creativity',
    speaker: 'Various Speakers',
    time: '17:00 - 18:00',
    date: '2025-10-15',
    track: 'Business',
    description: 'Industry leaders discuss how technology is reshaping the workplace and what it means for the future.',
    reactions: { thumbsUp: 41, thumbsDown: 6, heart: 49 }
  }
];

export type TrackFilter = 'All' | Session['track'];
export type TimeFilter = 'All' | 'Morning' | 'Afternoon' | 'Evening';
export type SortOption = 'time' | 'hearts' | 'reactions' | 'speaker' | 'title';
