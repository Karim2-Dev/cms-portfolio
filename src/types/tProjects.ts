export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  created_at: string;
  tags?: string[];
}

// شكل الـ response الموحّد لعمليات الكتابة (add/edit/delete)
export interface CrudResult {
  success: boolean;
  error?: string;
}

export interface ProjectStore {
  // State
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  // Read
  fetchProjects: () => Promise<void>;

  // Helper
  uploadThumbnail: (file: File) => Promise<string>;

  // Create
  addProject: (
    projectData: Omit<Project, "id" | "created_at" | "thumbnail">,
    imageFile: File | null,
  ) => Promise<CrudResult>;

  // Update
  editProject: (
    projectData: Omit<Project, "id" | "created_at" | "thumbnail">,
    imageFile: File | null,
    projectId: string,
  ) => Promise<CrudResult>;

  // Delete
  deleteProject: (projectId: string) => Promise<CrudResult>;
}
export type ProjectFormData = Omit<
  Project,
  "id" | "slug" | "content" | "created_at" | "is_featured"
>;
