import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Phone, MapPin, User, Calendar } from "lucide-react";

interface Member {
  id: number;
  fullName: string;
  gender: string;
  father: string;
  mother: string;
  grandfather: string;
  grandmother: string;
  children: string[];
  file: string;
  phone: string;
  village: string;
  address: string | null;
  created_at: string;
  profile_pic: string | null;
}

const FamilyCard = () => {
  const location = useLocation();
  const members: Member = location.state?.member;

  if (!members) return <p>No Data Found</p>;

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-3xl rounded-3xl shadow-xl border-0 overflow-hidden">

        {/*  Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex items-center gap-4 text-white">
          <img
            src={
              members.file
                ? `http://localhost:5000/uploads/${members.file}`
                : "https://via.placeholder.com/100"
            }
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />

          <div>
            <h2 className="text-2xl font-bold">{members.fullName}</h2>
            <p className="text-sm opacity-90 capitalize">
              {members.gender || "Not specified"}
            </p>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col gap-6">

          {/*  Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem icon={<Phone size={16} />} label="Phone" value={members.phone} />
              <InfoItem icon={<MapPin size={16} />} label="Village" value={members.village} />
              <InfoItem icon={<User size={16} />} label="Address" value={members.address} />
              <InfoItem
                icon={<Calendar size={16} />}
                label="Created"
                value={new Date(members.created_at).toLocaleDateString()}
              />
            </div>
          </div>

          {/*  Family Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Family Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoItem label="Father" value={members.father} />
              <InfoItem label="Mother" value={members.mother} />
              <InfoItem label="Grandfather" value={members.grandfather} />
              <InfoItem label="Grandmother" value={members.grandmother} />
            </div>
          </div>

          {/* 👶 Children */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Children
            </h3>

            {members.children?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {members.children.map((child, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full shadow-sm"
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
    </div>
  );
};

/* 🔹 Reusable Info Item Component */
const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | null;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">
    {icon && <div className="text-gray-500">{icon}</div>}
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  </div>
);

export default FamilyCard;