import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";


interface Member {
  id: number;
  fullName: string;
  gender: string;
  father: string;
  mother: string;
  grandfather: string;
  grandmother: string;
  children: string; // comma separated
  file: string;
}

const FamilyCard = () => {

  const location = useLocation();
  const members = location.state?.member;
  console.log("dvjrwvij===ff=========>>>>>>>>>>",members)



  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-4">
      <CardContent className="flex flex-col gap-4">

        {/* 👤 Profile */}
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:5000/uploads/${members.file}`}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-lg font-semibold">
              {members.fullName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {members.gender}
            </p>
          </div>
        </div>

        {/* 👨‍👩‍👧 Family Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">

          <div>
            <p className="text-gray-500">Father</p>
            <p className="font-medium">{members.father || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Mother</p>
            <p className="font-medium">{members.mother || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Grandfather</p>
            <p className="font-medium">{members.grandfather || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Grandmother</p>
            <p className="font-medium">{members.grandmother || "-"}</p>
          </div>

        </div>

        {/* 👶 Children */}
        <div>
          <p className="text-gray-500 text-sm mb-1">Children</p>

          {members.children ? (
            <div className="flex flex-wrap gap-2">
              {members.children.split(",").map((child: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-md text-xs"
                >
                  {child}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No children</p>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default FamilyCard;