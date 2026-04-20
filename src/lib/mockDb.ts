
// Simulation simple de Firestore utilisant localStorage
export const mockDb = {
  collection: (name: string) => {
    return {
      name,
      get: () => {
        const data = localStorage.getItem(`mock_db_${name}`);
        return data ? JSON.parse(data) : [];
      },
      set: (data: any[]) => {
        localStorage.setItem(`mock_db_${name}`, JSON.stringify(data));
      }
    };
  },
  
  // Helpers for common operations
  getAll: (collectionName: string) => {
    const data = localStorage.getItem(`mock_db_${collectionName}`);
    return data ? JSON.parse(data) : [];
  },
  
  add: (collectionName: string, doc: any) => {
    const items = mockDb.getAll(collectionName);
    const newDoc = { 
      ...doc, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.unshift(newDoc);
    localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(items));
    return newDoc;
  },
  
  update: (collectionName: string, id: string, updates: any) => {
    const items = mockDb.getAll(collectionName);
    const index = items.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(items));
      return items[index];
    }
    return null;
  },
  
  delete: (collectionName: string, id: string) => {
    const items = mockDb.getAll(collectionName);
    const filtered = items.filter((item: any) => item.id !== id);
    localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(filtered));
  },

  set: (collectionName: string, data: any[]) => {
    localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(data));
  },

  // Seed default data if empty
  seed: (collectionName: string, initialData: any[]) => {
    const existing = mockDb.getAll(collectionName);
    if (existing.length === 0) {
      localStorage.setItem(`mock_db_${collectionName}`, JSON.stringify(initialData));
    }
  }
};
