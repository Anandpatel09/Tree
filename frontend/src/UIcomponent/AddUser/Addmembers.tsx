import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const AddMembers = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      father: "",
      mother: "",
      grandfather: "",
      grandmother: "",
      village: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <FormLabel>Date of Birth</FormLabel>
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

              {/* Family Fields */}
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                control={form.control}
                name="father"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Father Name"/>
                    </FormControl>
                  </FormItem>
                )}
              />

                <FormField
                control={form.control}
                name="mother"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Mother Name"/>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grandfather"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Grand Father"/>
                    </FormControl>
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="grandmother"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Grand Mother"/>
                    </FormControl>
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
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Village"/>
                    </FormControl>
                  </FormItem>
                )}
              />
              

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Address"/>
                    </FormControl>
                  </FormItem>
                )}
              />
            
             <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Father Name</FormLabel> */}
                    <FormControl>
                      <Input {...field}  placeholder="Phone Number"/>
                    </FormControl>
                  </FormItem>
                )}
              />
            
             

              {/* File Upload */}
              <div>
                 <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload File</FormLabel>
                    <FormControl>
                      <Input {...field} type="file"  />
                    </FormControl>
                  </FormItem>
                )}
              />
                {/* <Label>Upload File</Label>
                <Input type="file" className="mt-2" /> */}
              </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
                <Button type="submit">Add Member</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMembers;