// Storage key for user data
const STORAGE_KEY = 'users';

export const authService = {
  // Register a new user with Email uniqueness check
  register: (userData) => {
    // Get existing users from storage
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    //  Check if the email already exists in our "database"
    const isEmailTaken = users.some(user => user.email === userData.email);

    if (isEmailTaken) {
      throw new Error("This email is already registered. Please use another one or login.");
    }

    //  If email is unique, add the new user
    users.push({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    });
    
    //  Save updated list back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  },

  // Login verification using Email
  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const userFound = users.find(u => u.email === email && u.password === password);

    if (userFound) {
      const token = "session-" + Math.random();
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(userFound));
      return userFound;
    } else {
      throw new Error("Invalid email or password!");
    }
  },

  logout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  },
  isAuthenticated: () => {
      const token = localStorage.getItem('userToken');
      return !!token; 
    },
    
    getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('userData'));
    }
};
export default authService;