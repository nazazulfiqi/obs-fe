import { IoWarningOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser, setUsers } from '@/redux/userSlice';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

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
      const response = await axios.get(`${BASE_API_URL}/users`);
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      await axios.delete(`${BASE_API_URL}/users/${userId}`);
      dispatch(deleteUser(parseInt(userId)));
      fetchUsers();

      toast({
        title: 'User Deleted Successfully',
        description: 'The user has been successfully deleted.',
      });
    } catch (error) {
      console.error('Failed to delete user:', error);

      toast({
        title: 'Error',
        description: 'Failed to delete the user. Please try again.',
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
              Are you sure you want to delete this user?
            </h6>
          </DialogTitle>

          <DialogDescription className="text-center">
            Please review the user information carefully.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between gap-2 md:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Review Again
            </Button>
          </DialogClose>
          <DialogClose className="w-full">
            <Button
              type="submit"
              className="text-white w-full bg-red-800 hover:bg-red-900"
              onClick={handleSubmitDelete}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
