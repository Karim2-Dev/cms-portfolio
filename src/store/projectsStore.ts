import { create } from "zustand";
import { supabase } from "@/src/lib/supabaseClient";
import { Project, ProjectStore } from "@/src/types/tProjects";

// Helper بيستخرج رسالة الخطأ بشكل آمن من غير any
function getErrorMessage(err: unknown): string {
  // 👈 هذا السطر سيقوم بتحويل الـ Object بالكامل إلى نص مقروء مهما كانت تركيبته
  console.error("🔴 تفاصيل الخطأ الحقيقية:", JSON.stringify(err, null, 2));
  console.log("🔴 كائن الخطأ كـ Log عادي:", err);

  if (err instanceof Error) return err.message;
  return "حصل خطأ غير متوقع";
}
export const useAdminStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      set({ error: error.message, isLoading: false });
    } else {
      set({ projects: data as Project[], isLoading: false });
    }
  },

  uploadThumbnail: async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  addProject: async (projectData, imageFile) => {
    set({ isLoading: true, error: null });
    try {
      let thumbnailUrl: string | undefined;

      if (imageFile) {
        thumbnailUrl = await get().uploadThumbnail(imageFile);
      }

      const { data, error } = await supabase
        .from("projects")
        .insert([{ ...projectData, thumbnail: thumbnailUrl }])
        .select();

      if (error) throw error;

      set((state) => ({
        projects: [data[0] as Project, ...state.projects],
        isLoading: false,
      }));

      return { success: true };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  editProject: async (projectData, imageFile, projectId) => {
    set({ isLoading: true, error: null });
    try {
      let thumbnailUrl: string | undefined;

      if (imageFile) {
        thumbnailUrl = await get().uploadThumbnail(imageFile);
      }

      const { data, error } = await supabase
        .from("projects")
        .update({
          ...projectData,
          ...(thumbnailUrl ? { thumbnail: thumbnailUrl } : {}),
        })
        .eq("id", projectId)
        .select();

      if (error) throw error;

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? (data[0] as Project) : p,
        ),
        isLoading: false,
      }));

      return { success: true };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  deleteProject: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      console.log("projectId:", projectId);
      console.log("data:", data);
      console.log("error:", error);
      if (error) throw error;

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
        isLoading: false,
      }));

      return { success: true };
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },
}));
