export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  phone?: string | null;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  category?: string | null;
  budget?: number | null;
  techStack?: string | null;
  imageUrl?: string | null;
  caseStudy?: CaseStudy | null;
}

export interface CaseStudy {
  id: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string;
  imageUrl?: string | null;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  content: string;
  rating: number;
  user: { name: string; role?: string | null };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  imageUrl?: string | null;
  skills: string[];
  order: number;
}
