"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { useUser } from "@clerk/nextjs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { LuUser } from "react-icons/lu";
import { useState } from "react";
import ImageProfile from "./ImageProfile";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
export default function ProfileInfo() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { user } = useUser();
  return (
    <div className="border border-border rounded-lg p-5 bg-card transition-all duration-200 ease-in-out">
      <div className="heading flex justify-between items-center">
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
      <div className="info mt-5 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="left-side flex flex-col gap-2  w-full md:w-1/2">
          <Field>
            <FieldLabel htmlFor="full-name">Full Name:</FieldLabel>
            <InputGroup>
              <InputGroupInput
                disabled={!isEditMode}
                id="full-name"
                defaultValue={user?.fullName || ""}
                placeholder="Enter your full name"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email:</FieldLabel>
            <InputGroup>
              <InputGroupInput
                disabled={!isEditMode}
                id="email"
                defaultValue={user?.emailAddresses[0].emailAddress || ""}
                placeholder="Enter your email"
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password:</FieldLabel>
            <InputGroup>
              <InputGroupInput
                disabled={!isEditMode}
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputGroupAddon align="inline-end">
                {isPasswordVisible ? (
                  <EyeIcon
                    className={` ${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                    onClick={() => isEditMode && setIsPasswordVisible(false)}
                  />
                ) : (
                  <EyeOffIcon
                    className={` ${!isEditMode ? "text-muted-foreground cursor-default" : "cursor-pointer"}`}
                    onClick={() => isEditMode && setIsPasswordVisible(true)}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
        <div className="right-side w-full md:w-1/2 h-[220px]">
          <ImageProfile defaultImg={user?.imageUrl} isEditMode={isEditMode} />
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
                  variant="ghost"
                  className="cursor-pointer border-none bg-transparent"
                >
                  Reset Changes
                </Button>
                <Button className="cursor-pointer">Save Changes</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
