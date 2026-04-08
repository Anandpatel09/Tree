// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Plus, Trash2 } from "lucide-react";
// // import { useState } from "react";
// import { addUsers } from "@/api";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// /* -------------------- TYPES -------------------- */

// interface Child {
//   child_name: string;
//   child_gender: string;
// };

// export interface FormValues {
//   fullName?: string;
//   wifename?: string;
//   dob?: string;
//   gender?: string;
//   father?: string;
//   mother?: string;
//   grandfather?: string;
//   grandmother?: string;
//   village?: string;
//   address?: string;
//   phone?: string;
//   file?: File | null;
//   children?: Child[];
// };

// /* -------------------- COMPONENT -------------------- */

// const AddMembers = () => {
//   const [close, setClose] = useState(true);

//  const zodSchema = z.object({
//   fullName: z.string().min(3, "Full Name is required"),
//   wifename: z.string().optional(),
//   dob: z.string().min(1, "DOB is required"),
//   gender: z.string().min(1, "Gender is required"),
//   father: z.string().min(3, "Father name is required"),
//   mother: z.string().min(3, "Mother name is required"),
//   grandfather: z.string().min(3, "Grandfather name is required"),
//   grandmother: z.string().min(3, "Grandmother name is required"),
//   phone: z.string().min(10, "Phone number is required").regex(/^\+?[0-9\-\s]+$/, "Phone must contain only digits"),
//   village: z.string().min(2, "Village is required"),
//   address: z.string().min(3, "Address is required"),
//   file: z.any()
//     .optional()
//     .refine((file) => !file || file instanceof File, "Upload a valid file"),
//   children: z.array(
//     z.object({
//       child_name: z.string().min(1, "Child name is required"),
//       child_gender: z.string().min(1, "Child gender is required")
//     })
//   ).optional()
// });

//  type FormValues = z.infer<typeof zodSchema>;



//   const form = useForm<FormValues>({
//     resolver: zodResolver(zodSchema),

//     defaultValues: {
//       fullName: "",
//       wifename: "",
//       dob: "",
//       gender: "",
//       father: "",
//       mother: "",
//       grandfather: "",
//       grandmother: "",
//       village: "",
//       address: "",
//       phone: "",
//       file: null,
//       children: [],
//     },
//   });


//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "children",
//   });

//   const onSubmit = async (data: FormValues) => {
//     const formData = new FormData();
//     formData.append("fullName", data.fullName || "");
//     formData.append("wifename", data.wifename || "");
//     formData.append("dob", data.dob || "");
//     formData.append("gender", data.gender || "");
//     formData.append("father", data.father || "");
//     formData.append("mother", data.mother || "");
//     formData.append("grandfather", data.grandfather || "");
//     formData.append("grandmother", data.grandmother || "");
//     formData.append("village", data.village || "");
//     formData.append("address", data.address || "");
//     formData.append("phone", data.phone || "");
//     if (data.file) {
//       formData.append("file", data.file as File);
//     }
//     formData.append("children", JSON.stringify(data.children || []));

//     try {
//       const result = await addUsers(formData);
//       if (result.status === 200) {
//         toast.success("Member added successfully.");
//       }
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to add member");
//     }
//   };

//   const usenav = useNavigate();
//   const handlenavigation = () => {
//     usenav("/home");
//     setClose(false);
//   }


//   return (
//     <>
//       {close &&
//         <div className="min-h-screen bg-gray-200 flex justify-center p-8">
//           <Card className="w-[700px] shadow-md">
//             <CardHeader>
//               <CardTitle className="text-xl">Add Member</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-6"
//                 >
//                   {/* Full Name */}
//                   <FormField
//                     control={form.control}
//                     name="fullName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name <span className="text-red-600">*</span></FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />

//                       </FormItem>
//                     )}
//                   />

//                   {/* spouse Name */}
//                   <FormField
//                     control={form.control}
//                     name="wifename"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Wife Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                               <FormMessage />

//                       </FormItem>
//                     )}
//                   />

//                   {/* DOB + Gender */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="dob"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Date of Birth <span className="text-red-600">*</span></FormLabel>
//                           <FormControl>
//                             <Input type="date" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="gender"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Gender</FormLabel>

//                           <RadioGroup
//                             onValueChange={field.onChange}
//                             value={field.value}
//                             className="flex gap-6 mt-2"
//                           >
//                             <div className="flex items-center gap-2">
//                               <RadioGroupItem value="male" />
//                               <Label>Male</Label>
//                             </div>

//                             <div className="flex items-center gap-2">
//                               <RadioGroupItem value="female" />
//                               <Label>Female</Label>
//                             </div>
//                           </RadioGroup>

//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Family Section */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="col-span-2 space-y-3">
//                       {fields.map((item, index) => (
//                         <div
//                           key={item.id}
//                           className="flex items-center gap-2"
//                         >
//                           {/* Child Name */}
//                           <FormField
//                             control={form.control}
//                             name={`children.${index}.child_name`}
//                             render={({ field }) => (
//                               <FormItem className="flex-1">
//                                 <FormControl>
//                                   <Input
//                                     {...field}
//                                     placeholder="Child Name"
//                                   />
//                                 </FormControl>
//                               </FormItem>
//                             )}
//                           />

//                           {/* Child Gender */}
//                           <FormField
//                             control={form.control}
//                             name={`children.${index}.child_gender`}
//                             render={({ field }) => (
//                               <FormItem className="w-32">
//                                 <FormControl>
//                                   <select
//                                     {...field}
//                                     className="border rounded-md p-2 w-full"
//                                   >
//                                     <option value="">Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                   </select>
//                                 </FormControl>
//                               </FormItem>
//                             )}
//                           />

//                           {/* Remove Child */}
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => remove(index)}
//                           >
//                             <Trash2 size={16} />
//                           </Button>
//                         </div>
//                       ))}

//                       {/* Add More Child */}
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() =>
//                           append({ child_name: "", child_gender: "" })
//                         }
//                         className="flex items-center gap-2 w-fit"
//                       >
//                         <Plus size={16} />
//                         Add Child
//                       </Button>
//                     </div>


//                     {/* Father */}
//                     <FormField
//                       control={form.control}
//                       name="father"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Father Name "
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                     {/* Mother */}
//                     <FormField
//                       control={form.control}
//                       name="mother"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Mother Name"
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                     {/* Grandfather */}
//                     <FormField
//                       control={form.control}
//                       name="grandfather"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Grand Father"
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                     {/* Grandmother */}
//                     <FormField
//                       control={form.control}
//                       name="grandmother"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Grand Mother"
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                   </div>

//                   {/* Village */}
//                   <FormField
//                     control={form.control}
//                     name="village"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input {...field} placeholder="Village" />
//                         </FormControl>
//                               <FormMessage />

//                       </FormItem>
//                     )}
//                   />

//                   {/* Address */}
//                   <FormField
//                     control={form.control}
//                     name="address"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input {...field} placeholder="Address" />
//                         </FormControl>
//                               <FormMessage />

//                       </FormItem>
//                     )}
//                   />

//                   {/* Phone + File */}
//                   <div className="grid grid-cols-2 gap-4">

//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="Phone Number"
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="file"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Upload File</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="file"
//                               onChange={(e) =>
//                                 field.onChange(
//                                   e.target.files?.[0] || null
//                                 )
//                               }
//                             />
//                           </FormControl>
//                                 <FormMessage />

//                         </FormItem>
//                       )}
//                     />

//                   </div>

//                   {/* Buttons */}
//                   <div className="flex justify-end gap-3">
//                     <Button type="button" variant="secondary"
//                       onClick={handlenavigation} >
//                      Close
//                     </Button>

//                     <Button type="submit">
//                       Add Member
//                     </Button>
//                   </div>

//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
//       }
//     </>
//   );
// };

// export default AddMembers;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { addUsers } from "@/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* -------------------- SCHEMA -------------------- */

const zodSchema = z.object({
  fullName: z.string().trim().min(3).regex(/^[A-Za-z\s]+$/, "Only alphabets"),

  wifename: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s]*$/, "Only alphabets")
    .optional(),

  dob: z
    .string()
    .min(1, "DOB required")
    .refine((d) => new Date(d) < new Date(), {
      message: "DOB must be in past",
    }),

  gender: z.enum(["male", "female"], {
    message: "Select gender",
  }),

  father: z.string().min(3).regex(/^[A-Za-z\s]+$/, "Only alphabets"),
  mother: z.string().min(3).regex(/^[A-Za-z\s]+$/, "Only alphabets"),
  grandfather: z.string().min(3).regex(/^[A-Za-z\s]+$/, "Only alphabets"),
  grandmother: z.string().min(3).regex(/^[A-Za-z\s]+$/, "Only alphabets"),

  phone: z
    .string()
    .regex(/^(?:\+91)?[6-9]\d{9}$/, "Invalid Indian phone number"),

  village: z.string().min(2),
  address: z.string().min(5),

  file: z
    .any()
    .optional()
    .refine((f) => !f || f instanceof File, "Invalid file")
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Max 2MB")
    .refine(
      (f) =>
        !f || ["image/jpeg", "image/png", "image/jpg"].includes(f.type),
      "Only JPG/PNG"
    ),

  children: z
    .array(
      z.object({
        child_name: z.string().min(1),
        child_gender: z.enum(["male", "female"]),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof zodSchema>;

/* -------------------- COMPONENT -------------------- */

const AddMembers = () => {
  const [close, setClose] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      wifename: "",
      dob: "",
      gender: undefined,
      father: "",
      mother: "",
      grandfather: "",
      grandmother: "",
      village: "",
      address: "",
      phone: "",
      file: null,
      children: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "children") {
        formData.append("children", JSON.stringify(value || []));
      } else if (key === "file") {
        if (value) formData.append("file", value as File);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await addUsers(formData);
      if (res.status === 200) {
        toast.success("Member added");
        form.reset();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {close && (
        <div className="min-h-screen bg-gray-200 flex justify-center p-8">
          <Card className="w-175">
            <CardHeader>
              <CardTitle>Add Member</CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Wife */}
                  <FormField
                    control={form.control}
                    name="wifename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wife Name</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* DOB + Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DOB *</FormLabel>
                          <Input type="date" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender *</FormLabel>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-4"
                          >
                            <div className="flex gap-2">
                              <RadioGroupItem value="male" />
                              <Label>Male</Label>
                            </div>
                            <div className="flex gap-2">
                              <RadioGroupItem value="female" />
                              <Label>Female</Label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Children */}
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`children.${index}.child_name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Input {...field} placeholder="Child Name" />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`children.${index}.child_gender`}
                        render={({ field }) => (
                          <FormItem>
                            <select {...field} className="border p-2">
                              <option value="">Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="button" onClick={() => remove(index)}>
                        <Trash2 />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={() =>
                      append({ child_name: "", child_gender: "male" })
                    }
                  >
                    <Plus /> Add Child
                  </Button>

                  {/* Family */}
                  <div className="grid grid-cols-2 gap-4">
                    {["father", "mother", "grandfather", "grandmother"].map(
                      (fieldName) => (
                        <FormField
                          key={fieldName}
                          control={form.control}
                          name={fieldName as any}
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                {...field}
                                placeholder={fieldName}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>

                  {/* Village */}
                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem>
                        <Input {...field} placeholder="Village" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <Input {...field} placeholder="Address" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone + File */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <Input type="tel" {...field} placeholder="Phone" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            type="file"
                            onChange={(e) =>
                              field.onChange(
                                e.target.files?.[0] || null
                              )
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        navigate("/home");
                        setClose(false);
                      }}
                    >
                      Close
                    </Button>

                    <Button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddMembers;``