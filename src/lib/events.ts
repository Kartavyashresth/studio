import type { CollegeEvent } from './types';

export const events: CollegeEvent[] = [
  {
    id: 'evt001',
    name: 'TechSpark 2024',
    date: '2024-10-15',
    location: 'Main Auditorium',
    description: 'An annual tech fest with coding competitions, robotics workshops, and guest lectures from industry experts.',
    imageUrl: 'https://picsum.photos/seed/techspark/600/400',
    tags: ['Technology', 'Workshop', 'Competition'],
  },
  {
    id: 'evt002',
    name: 'Cultural Night',
    date: '2024-11-02',
    location: 'Amphitheatre',
    description: 'A celebration of diversity with music, dance, and drama performances from various student groups.',
    imageUrl: 'https://picsum.photos/seed/cultural-night/600/400',
    tags: ['Culture', 'Music', 'Performance'],
  },
  {
    id: 'evt003',
    name: 'Entrepreneurs Summit',
    date: '2024-11-20',
    location: 'Business School, Hall 1',
    description: 'Connect with successful entrepreneurs, pitch your startup ideas, and learn about the future of business.',
    imageUrl: 'https://picsum.photos/seed/esummit/600/400',
    tags: ['Business', 'Networking', 'Startup'],
  },
  {
    id: 'evt004',
    name: 'Annual Sports Day',
    date: '2024-12-05',
    location: 'University Sports Complex',
    description: 'Compete in various track and field events, and cheer for your favorite teams in inter-departmental matches.',
    imageUrl: 'https://picsum.photos/seed/sports-day/600/400',
    tags: ['Sports', 'Competition', 'Athletics'],
  },
];
