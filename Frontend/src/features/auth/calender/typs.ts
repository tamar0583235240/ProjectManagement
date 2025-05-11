export interface Event {
    _id: string;
    title: string;
    description?: string;
    start: string; // ISO string
    end: string;   // ISO string
    user: string;
    organization: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // טיפוס ליצירת אירוע (ללא _id וtimestamps)
  export interface NewEvent {
    title: string;
    description?: string;
    start: string; // ISO format
    end: string;
  }
  