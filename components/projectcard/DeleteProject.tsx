import { AlertDialogDestructive } from "../AlertSubmitting";
import { useAdminStore } from "@/src/store/projectsStore";

export default function DeleteProject({ id }: { id: string }) {
  const { deleteProject } = useAdminStore();

  return (
    <AlertDialogDestructive
      title="Delete project?"
      description="Are you sure to delete this project?"
      clickName="Delete"
      handleClick={() => deleteProject(id)}
    />
  );
}
