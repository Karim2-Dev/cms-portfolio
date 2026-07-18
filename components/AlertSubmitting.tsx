import { Loader2Icon, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAdminStore } from "@/src/store/projectsStore";

export function AlertDialogDestructive({
  title,
  description,
  clickName,
  handleClick,
  btn,
}: {
  title: string;
  description?: string;
  clickName?: string;
  handleClick: () => void;
  btn?: React.ReactNode;
}) {
  const { isLoading } = useAdminStore();
  const handleDeleteClick = async () => {
    await handleClick();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {btn ? (
          btn
        ) : (
          <button className="transition-colors cursor-pointer hover:text-primary">
            <RiDeleteBinLine className="w-5 h-5 " />
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDeleteClick}
          >
            {isLoading ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              clickName
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
