import type { RegisteredUser } from './types';

// This is a mock in-memory "database" of users.
// In a real application, this would be replaced with a proper database connection.
export let allUsers: RegisteredUser[] = [
    { name: 'Kartavya Shresth', email: 'kartavya@gecv', role: 'student', branch: 'Computer Science' },
    { name: 'pradeep srivastav', email: 'pradeep@hodgecv', role: 'faculty' },
    { name: 'nivedita singh', email: 'nivedita@assprofgecv', role: 'faculty' },
    { name: 'Employer Account', email: 'employer@example.com', role: 'employer' },
    { name: 'Admin Account', email: 'admin@example.com', role: 'institute_admin' },
];

// Function to add a new user to our mock database.
export function addUser(user: Omit<RegisteredUser, 'id'>) {
  const newUser = { ...user, id: `user-${allUsers.length + 1}` };
  allUsers.push(newUser);
  return newUser;
}
