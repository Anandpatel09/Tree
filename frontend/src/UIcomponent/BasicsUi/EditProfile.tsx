import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProfileApi, updateUser } from "@/api";
import toast from "react-hot-toast";
import type { User } from "./Profile";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------- VALIDATION ---------------- */

const schema = z.object({
  full_name: z
    .string()
    .min(3, "Name required")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),

  email: z.string().email("Invalid email"),

  phone: z
    .string()
    .regex(/^(?:\+91)?[6-9]\d{9}$/, "Invalid Indian phone"),

  dob: z.string().min(1, "DOB required"),

  gender: z.enum(["male", "female"], {
 message: "Select gender",  }),
});

type FormValues = z.infer<typeof schema>;

/* ---------------- PROPS ---------------- */

interface EditProf {
  editProfile: boolean;
  setEditProfileUser: (value: boolean) => void;
  id: number;
  setProfileUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/* ---------------- COMPONENT ---------------- */

const EditProfile = ({
  editProfile,
  setEditProfileUser,
  id,
  setProfileUser,
}: EditProf) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "male",
    },
  });

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        const user = res.data;

        form.reset({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          dob: user.dob?.split("T")[0] || "",
          gender: user.gender || "male",
        });

        setPreview(user.image || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    if (editProfile) fetchProfile();
  }, [editProfile, form]);

  /* ---------------- IMAGE ---------------- */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max file size 2MB");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG/PNG allowed");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Submitting:", values);

      const data = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) data.append("image", image);

      const result = await updateUser(id, data);

      toast.success(result?.data?.message || "Profile updated");

      const updatedProfile = await getProfileApi();
      setProfileUser(updatedProfile.data);

      setEditProfileUser(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={editProfile} onOpenChange={setEditProfileUser}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input {...form.register("full_name")} />
            <p className="text-red-500 text-sm">
              {form.formState.errors.full_name?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input type="email" {...form.register("email")} />
            <p className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>
            <Input type="tel" {...form.register("phone")} />
            <p className="text-red-500 text-sm">
              {form.formState.errors.phone?.message}
            </p>
          </div>

          {/* DOB */}
          <div>
            <Label>DOB</Label>
            <Input type="date" {...form.register("dob")} />
            <p className="text-red-500 text-sm">
              {form.formState.errors.dob?.message}
            </p>
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <select
              {...form.register("gender")}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p className="text-red-500 text-sm">
              {form.formState.errors.gender?.message}
            </p>
          </div>

          {/* Image */}
          <div>
            <Label>Profile Image</Label>
            <Input type="file" accept="image/*" onChange={handleImage} />
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt={`${form.getValues("full_name") || "User"} profile`}
              title="Profile image"
              onError={(e: any) =>
                (e.target.src = "/default-avatar.png")
              }
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;