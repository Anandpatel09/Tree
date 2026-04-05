import { membersDetail } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ✅ Type
interface Member {
  id: number;
  fullName: string;
  phone: string;
  village: string;
  file: string;
  created_at: string;
}

const Hometable = () => {
  const [members, setMembers] = useState<Member[]>([]);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getmembersData = async () => {
      try {
        const result = await membersDetail();
        setMembers(result.data.data);
      } catch (error) {
        toast.error("No member");
      }
    };

    getmembersData();
  }, []);

  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentMembers = members.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(members.length / itemsPerPage);

  return (
    <div className="p-6">
      <Table>
        <TableCaption className="caption-top mb-1 ">Members List</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="bg-muted">Photo</TableHead>
            <TableHead className="bg-muted">Name</TableHead>
            <TableHead className="bg-muted">Phone Number</TableHead>
            <TableHead className="bg-muted">Village</TableHead>
            <TableHead className="bg-muted">Added Date</TableHead>
            <TableHead className="bg-muted">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentMembers.length > 0 ? (
            currentMembers.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={`http://localhost:5000/uploads/${item.file}`}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>

                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.village}</TableCell>

                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Button variant="outline">
                    
                     <Eye />
                    View</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Members Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Members</TableCell>
            <TableCell className="text-right">
              {members.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* ✅ Pagination UI */}
      <div className="flex justify-center mt-4 gap-2">
        {/* Prev */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
            
          )
        )}

        {/* Next */}
        <span>....</span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Hometable;