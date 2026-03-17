import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
// import { useState } from "react";
import { addUsers } from "@/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* -------------------- TYPES -------------------- */

interface Child {
  child_name: string;
  child_gender: string;
};

export interface FormValues {
  fullName?: string;
  wifename?: string;
  dob?: string;
  gender?: string;
  father?: string;
  mother?: string;
  grandfather?: string;
  grandmother?: string;
  village?: string;
  address?: string;
  phone?: string;
  file?: File | null;
  children?: Child[];
};

/* -------------------- COMPONENT -------------------- */

const AddMembers = () => {
  const [close, setClose] = useState(true);

 const zodSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  wifename: z.string().optional(),
  // dob: z.string().min(1,"DOB is Required"),
  dob: z.string(),
  gender: z.string(),
  father: z.string().min(3,"Father Name is required"),
  mother: z.string().min(3,"Mother Name is required"),
  grandfather: z.string().min(3,"required field"),
  grandmother: z.string().min(3,"required field"),
  phone: z.string("required field"),
  village: z.string("reqired field"),
  address: z.string("required field"),
  file: z.any().optional(),
  children: z.array(
    z.object({
      child_name: z.string(),
      child_gender: z.string()
    })
  ).optional()
});

 type FormValues = z.infer<typeof zodSchema>;



  const form = useForm<FormValues>({
    resolver: zodResolver(zodSchema),

    defaultValues: {
      fullName: "",
      wifename: "",
      dob: "",
      gender: "",
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

    const payload: FormValues = {
      fullName: data.fullName,
      wifename: data.wifename,
      dob: data.dob,
      gender: data.gender,
      father: data.father,
      mother: data.mother,
      grandfather: data.grandfather,
      grandmother: data.grandmother,
      village: data.village,
      address: data.address,
      phone: data.phone,
      file: data.file,
      children: data.children,
    }
    try {
      const result = await addUsers(payload);
      if (result.status === 200) {
        toast.success("Member Added successfully...")
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message)
    }
  };

  const usenav = useNavigate();
  const handlenavigation = () => {
    usenav("/home");
    setClose(false);
  }


  return (
    <>
      {close &&
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
          <Card className="w-[700px] shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Add Member</CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-600">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />

                      </FormItem>
                    )}
                  />

                  {/* spouse Name */}
                  <FormField
                    control={form.control}
                    name="wifename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wife Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          <FormLabel>Date of Birth <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>

                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6 mt-2"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="male" />
                              <Label>Male</Label>
                            </div>

                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="female" />
                              <Label>Female</Label>
                            </div>
                          </RadioGroup>

                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Family Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-3">
                      {fields.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2"
                        >
                          {/* Child Name */}
                          <FormField
                            control={form.control}
                            name={`children.${index}.child_name`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Child Name"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {/* Child Gender */}
                          <FormField
                            control={form.control}
                            name={`children.${index}.child_gender`}
                            render={({ field }) => (
                              <FormItem className="w-32">
                                <FormControl>
                                  <select
                                    {...field}
                                    className="border rounded-md p-2 w-full"
                                  >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {/* Remove Child */}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}

                      {/* Add More Child */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          append({ child_name: "", child_gender: "" })
                        }
                        className="flex items-center gap-2 w-fit"
                      >
                        <Plus size={16} />
                        Add Child
                      </Button>
                    </div>


                    {/* Father */}
                    <FormField
                      control={form.control}
                      name="father"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Father Name "
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                    {/* Mother */}
                    <FormField
                      control={form.control}
                      name="mother"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Mother Name"
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                    {/* Grandfather */}
                    <FormField
                      control={form.control}
                      name="grandfather"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Grand Father"
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                    {/* Grandmother */}
                    <FormField
                      control={form.control}
                      name="grandmother"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Grand Mother"
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                  </div>

                  {/* Village */}
                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Village" />
                        </FormControl>
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
                        <FormControl>
                          <Input {...field} placeholder="Address" />
                        </FormControl>
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
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Phone Number"
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload File</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) =>
                                field.onChange(
                                  e.target.files?.[0] || null
                                )
                              }
                            />
                          </FormControl>
                                <FormMessage />

                        </FormItem>
                      )}
                    />

                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="secondary"
                      onClick={handlenavigation} >
                      Cancel
                    </Button>

                    <Button type="submit">
                      Add Member
                    </Button>
                  </div>

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      }
    </>
  );
};

export default AddMembers;