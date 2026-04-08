import { Card, CardContent } from "@/components/ui/card";
import { Users,  Calendar } from "lucide-react";
import type { FamilyData } from "./Home";


interface Props {
  familyData?: FamilyData;
}
const HomeCards = ({familyData}:Props) => {
  return (
    <div className="flex justify-around gap-6 p-6">

      {/* Total Families */}
      <Card className="w-64 shadow-md border-b-4 border-blue-500">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">Total Families</p>
            <h2 className="text-3xl font-bold">{familyData?.totalFamilies}</h2>
          </div>
          <Users className="text-green-600" size={28} />
        </CardContent>
      </Card>

      {/* Total Members */}
      {/* <Card className="w-64 shadow-md border-b-4 border-blue-500">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <h2 className="text-3xl font-bold">{familyData?.totalMembers}</h2>
          </div>
          <User className="text-green-600" size={28} />
        </CardContent>
      </Card> */}

      {/* New This Month */}
      <Card className="w-64 shadow-md border-b-4 border-orange-400">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">New This Month</p>
            <h2 className="text-3xl font-bold">{familyData?.newThisMonth}</h2>
          </div>
          <Calendar className="text-red-400" size={28} />
        </CardContent>
      </Card>

    </div>
  );
};

export default HomeCards;