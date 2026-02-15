import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const SingUp =()=>{
    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-300 ">
      <Card className="w-full max-w-md mt-4 mb-4">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form  className="space-y-1">
            
            {/* Full Name */}
            <div>
              <Label className="mb-2">Full Name</Label>
              <Input  />
              <p className="text-red-500 text-sm mb-2">{}</p>
            </div>

            {/* Email */}
            <div>
              <Label className=" mb-2">Email</Label>
              <Input type="email"  />
              <p className="text-red-500 text-sm  mb-2">{}</p>
            </div>

            {/* Password */}
            <div>
              <Label className="mb-2">Password</Label>
              <Input type="password"  />
              <p className="text-red-500 text-sm mb-2">{}</p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="mb-2">Confirm Password</Label>
              <Input type="password"  />
              <p className="text-red-500 text-sm mb-2">{}</p>
            </div>

            {/* Phone */}
            <div>
              <Label className="mb-2">Phone Number</Label>
              <Input className="mb-2" />
            </div>

            {/* Profile Picture */}
            <div>
              <Label className="mb-2">Profile Picture</Label>
              <Input className="mb-2" type="file" />
            </div>

            {/* DOB */}
            <div>
              <Label className="mb-2">Date of Birth</Label>
              <Input className="mb-2" type="date"  />
            </div>

            {/* Gender */}
            <div className="mb-2">
              <Label className="mb-2">Gender</Label>
              <RadioGroup  className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label className="mb-2" htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label className="mb-2" htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
        </>
    )
}
export default SingUp