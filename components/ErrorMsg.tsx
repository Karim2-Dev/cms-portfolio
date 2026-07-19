import { FieldError } from "@/components/ui/field";
import { AnimatePresence, motion } from "motion/react";

export default function ErrorMsg({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <FieldError>{message}</FieldError>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
