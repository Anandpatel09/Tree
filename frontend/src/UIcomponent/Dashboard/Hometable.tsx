import { deleteMember, membersDetail } from "@/api";
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
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/Routers/routes";

const resolveImageUrl = (value?: string | null) =>
  value
    ? value.startsWith("http")
      ? value
      : `http://localhost:5000/uploads/${value}`
    : "";

interface Member {
  id: number;
  fullName: string;
  phone: string;
  village: string;
  file?: string | null;
  created_at: string;
  profile_pic?: string | null;
}

const Hometable = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  Fetch members
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

  //  Debounce logic (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // reset page
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //  Filter logic
  const filteredMembers = members.filter((item) =>
    item.fullName.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  //  Pagination logic on filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  //  Delete logic
  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this member?"
      );
      if (!confirmDelete) return;

      await deleteMember(id);

      setMembers((prev) => prev.filter((m) => m.id !== id));

      toast.success("Member deleted successfully");
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  return (
    <div className="p-6">
      {/*  Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption className="caption-top mb-1">
          Members List
        </TableCaption>

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
                    src={
                      resolveImageUrl(item.profile_pic || item.file) ||
                      "https://dummyimage.com/40x40/cccccc/000000&text=No+Image"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://dummyimage.com/40x40/cccccc/000000&text=No+Image";
                    }}
                  />
                </TableCell>

                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.village}</TableCell>

                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate(ROUTES.ALL_MEMBERS, {
                        state: { member: item },
                      })
                    }
                  >
                    <Eye />
                    View
                  </Button>

                  <Button
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
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
              {filteredMembers.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

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