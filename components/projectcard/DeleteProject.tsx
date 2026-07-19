import { AlertDialogDestructive } from "../AlertSubmitting";
import { useAdminStore } from "@/src/store/projectsStore";
import { toast } from "sonner";

export default function DeleteProject({ id }: { id: string }) {
  const { deleteProject } = useAdminStore();

  const deleteProjectHandler = () => {
    deleteProject(id);
    toast.success("Project deleted successfully", {
      description: "The project has been deleted from the database.",
      position: "top-center",
    });
  };

  return (
    <AlertDialogDestructive
      title="Delete project?"
      description="Are you sure to delete this project?"
      clickName="Delete"
      handleClick={deleteProjectHandler}
    />
  );
}
