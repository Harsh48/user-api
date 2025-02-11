interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const mockUsers: { [key: number]: User } = {
    1: { id: 1, name: "John Doe", email: "john@example.com" },
    2: { id: 2, name: "Jane Smith", email: "jane@example.com" },
    3: { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  };
  
  export default mockUsers;