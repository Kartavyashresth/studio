import type { RegisteredUser } from './types';

// This is a mock in-memory "database" of users.
// In a real application, this would be replaced with a proper database connection.
export let allUsers: RegisteredUser[] = [
    { name: 'Kartavya Shresth', email: 'kartavya@gecv', password: 'password123', role: 'student' },
    { name: 'pradeep srivastav', email: 'pradeep@hodgecv', password: 'password123', role: 'faculty' },
    { name: 'nivedita singh', email: 'nivedita@assprofgecv', password: 'password123', role: 'faculty' },
    { name: 'Employer Account', email: 'employer@example.com', password: 'password123', role: 'employer' },
    { name: 'Admin Account', email: 'admin@example.com', password: 'password123', role: 'institute_admin' },
];

// Function to add a new user to our mock database.
export function addUser(user: Omit<RegisteredUser, 'id'>) {
  const newUser = { ...user, id: `user-${allUsers.length + 1}` };
  allUsers.push(newUser);
  return newUser;
}
