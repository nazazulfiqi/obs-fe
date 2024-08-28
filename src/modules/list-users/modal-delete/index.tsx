import { IoWarningOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUser, setUsers } from "@/redux/userSlice"; // Import the Redux actions

interface ModalDeleteUserProps {
  modalTrigger: React.ReactNode;
  userId: string;
}

export const ModalDeleteUser = ({
  modalTrigger,
  userId,
}: ModalDeleteUserProps) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      // Make DELETE request to remove user from JSON server
      await axios.delete(`http://localhost:4000/users/${userId}`);

      // Dispatch the deleteUser action to update Redux store
      dispatch(deleteUser(parseInt(userId)));

      // Refetch users to update the list
      fetchUsers();

      // Show success toast notification
      toast({
        title: "User Deleted Successfully",
        description: "The user has been successfully deleted.",
      });
    } catch (error) {
      console.error("Failed to delete user:", error);

      // Show error toast notification
      toast({
        title: "Error",
        description: "Failed to delete the user. Please try again.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className="p-12 text-center sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-red-200 p-3">
              <IoWarningOutline className="text-red-800" size={24} />
            </div>
          </div>
          <DialogTitle>
            <h6 className="text-center">
              Apakah Anda yakin akan menghapus User?
            </h6>
          </DialogTitle>

          <DialogDescription className="text-center">
            Cek kembali informasi User dengan benar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Tinjau Ulang
            </Button>
          </DialogClose>
          <DialogClose className="w-full">
            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900"
              onClick={handleSubmitDelete}
            >
              Hapus
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
