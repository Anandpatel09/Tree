import { Card, CardContent } from "@/components/ui/card";
import { Users, User, Calendar } from "lucide-react";

const HomeCards = () => {
  return (
    <div className="flex justify-between gap-6 p-6">

      {/* Total Families */}
      <Card className="w-64 shadow-md border-b-4 border-blue-500">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">Total Families</p>
            <h2 className="text-3xl font-bold">85</h2>
          </div>
          <Users className="text-green-600" size={28} />
        </CardContent>
      </Card>

      {/* Total Members */}
      <Card className="w-64 shadow-md border-b-4 border-blue-500">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <h2 className="text-3xl font-bold">320</h2>
          </div>
          <User className="text-green-600" size={28} />
        </CardContent>
      </Card>

      {/* New This Month */}
      <Card className="w-64 shadow-md border-b-4 border-orange-400">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <p className="text-sm text-gray-500">New This Month</p>
            <h2 className="text-3xl font-bold">8</h2>
          </div>
          <Calendar className="text-red-400" size={28} />
        </CardContent>
      </Card>

    </div>
  );
};

export default HomeCards;