import { Project } from "./tProjects";

export type ProjectFormProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "add" | "edit";
  initialData?: Project;
};
