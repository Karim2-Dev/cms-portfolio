/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { useUser } from "@clerk/nextjs";
import { Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
import ImageProfile from "./ImageProfile";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { ProfileFormData, profileSchema } from "@/lib/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "./ErrorMsg";
import { AlertDestructive } from "@/components/ErrorAlert";

export default function ProfileForm() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const { user } = useUser();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",

    values: {
      fullName: user?.fullName || "",
      email: user?.emailAddresses[0].emailAddress || "",
      currentPassword: "",
      newPassword: "",

      image: undefined,
    },
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProfileFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const splitName = data.fullName.split(" ");
      await user?.update({ firstName: splitName[0], lastName: splitName[1] });

      if (data.currentPassword && data.newPassword) {
        await user?.updatePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        setIsEditMode(false);
      }

      if (data.image) {
        await user?.setProfileImage({
          file: data.image,
        });
      }
    } catch (err: any) {
      setServerError(
        err?.errors?.[0]?.message || "حصل خطأ أثناء الحفظ، حاول تاني",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const hasErrors = !!(
    errors.fullName ||
    errors.newPassword ||
    errors.email ||
    errors.currentPassword
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-border w-full rounded-lg p-5 bg-card transition-all duration-200 ease-in-out"
    >
      <div className="heading flex justify-between items-center gap-2">
        <div className="left-side">
          <div className="flex items-center gap-4">
            <div className="icon bg-primary/10 p-2 rounded-md">
              <LuUser size={27} className="text-primary" />
            </div>
            <h1 className="text-2xl font-semibold">Profile Information</h1>
          </div>
        </div>
        <div className="right-side">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
      <div className="info mt-5 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="left-side flex flex-col w-full md:w-1/2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="full-name">Full Name:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  disabled={!isEditMode}
                  id="full-name"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                />
              </InputGroup>
              <ErrorMsg message={errors.fullName?.message} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  disabled={!isEditMode}
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email"
                />
              </InputGroup>
              <ErrorMsg message={errors.email?.message} />
            </Field>

            {user?.passwordEnabled && (
              <Field>
                <FieldLabel htmlFor="current-password">
                  Current Password:
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    disabled={!isEditMode}
                    id="current-password"
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    placeholder="Enter current password"
                    {...register("currentPassword")}
                  />
                  {/* الأيقونة زي ما هي */}
                  <InputGroupAddon align="inline-end">
                    {isCurrentPasswordVisible ? (
                      <EyeIcon
                        className={`${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                        onClick={() =>
                          isEditMode && setIsCurrentPasswordVisible(false)
                        }
                      />
                    ) : (
                      <EyeOffIcon
                        className={`${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                        onClick={() =>
                          isEditMode && setIsCurrentPasswordVisible(true)
                        }
                      />
                    )}
                  </InputGroupAddon>
                </InputGroup>

                <ErrorMsg message={errors.currentPassword?.message} />
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="password">New Password:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  disabled={!isEditMode}
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword")}
                />
                <InputGroupAddon align="inline-end">
                  {isPasswordVisible ? (
                    <EyeIcon
                      className={`${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                      onClick={() => isEditMode && setIsPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      className={`${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                      onClick={() => isEditMode && setIsPasswordVisible(true)}
                    />
                  )}
                </InputGroupAddon>
              </InputGroup>
              <AnimatePresence>
                <ErrorMsg message={errors.newPassword?.message} />
              </AnimatePresence>
            </Field>
          </FieldGroup>
        </div>
        <div className="right-side w-full md:w-1/2 h-[300px]">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageProfile
                defaultImg={user?.imageUrl}
                isEditMode={isEditMode}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="btns mt-5 flex justify-end items-center gap-2 w-full">
        <AnimatePresence initial={false}>
          {isEditMode && (
            <motion.div
              key="btns"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="btns mt-5 flex justify-end items-center gap-2 w-full">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => reset()}
                  className="cursor-pointer border-none bg-transparent"
                >
                  Reset Changes
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer transition-all duration-200 ease-in-out"
                  disabled={isSubmitting || hasErrors}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {serverError && (
        <AlertDestructive title="Error" description={serverError} />
      )}
    </form>
  );
}
