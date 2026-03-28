import React, {  useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { getProfileApi, updateUser } from '@/api';
import toast from 'react-hot-toast';


interface EditProf {
    editProfile: boolean,
    setEditProfileUser: (value: boolean) => void;
    id:number;
}

const EditProfile = ({ editProfile, setEditProfileUser,id }: EditProf) => {

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

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const result=await updateUser(id, formData);
        toast.success(`${result?.data?.message}`)
        await getProfileApi();
        setEditProfileUser(false);
        }catch(err){
            toast.error("can not update the profile");
        }
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
                            <Label className='mb-4'>Full Name</Label>
                            <Input
                                name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className='mb-4'>Email</Label>
                            <Input
                                name="email"
                                type="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className='mb-4'>Phone</Label>
                            <Input
                                name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className='mb-4'>Date of Birth</Label>
                            <Input
                                name="dob"
                                type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className='mb-4'>Gender</Label>
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
