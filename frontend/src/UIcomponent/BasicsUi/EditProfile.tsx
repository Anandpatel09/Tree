import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';


interface EditProf {
    editProfile: boolean,
    setEditProfileUser: (value: boolean) => void;
}

// interface EditData {
//     full_name: string,
//     email: string,
//     phone: string,
//     dob: string,
//     gender: string,
// }
const EditProfile = ({ editProfile, setEditProfileUser }: EditProf) => {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
    })

const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    setFormData((prev)=>({
     ...prev,
     [name]:value
    }))
}
       console.log("kncnc cdncjdcndc dc djcnjcndcdcdc=====",formData);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

       console.log("kncnc cdncjdcndc dc djcnjcndcdcdc=====",formData);
    }
    return (
        <div>


            <Dialog open={editProfile} onOpenChange={setEditProfileUser}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input
                                name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Date of Birth</Label>
                            <Input
                                name="dob"
                                type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <Input
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditProfile
