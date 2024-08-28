import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { Link } from "react-router-dom";
import { setUsers } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { User } from "../types/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ModalDeleteUser } from "@/modules/list-users/modal-delete";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

const ListUsers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>("http://localhost:4000/users");
      dispatch(setUsers(response.data));
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <>
      {users.map((user) => (
        <Card
          key={user.id}
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="flex flex-row gap-4 items-center min-h-[120px]">
            <Avatar>
              <AvatarImage src={`https://picsum.photos/seed/${user.id}/50`} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-semibold line-clamp-2">
              {user.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 min-h-44 ">
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address.street},{" "}
              {user.address.city}
            </p>
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
            <p>
              <em>{user.company.catchPhrase}</em>
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link to={`/pekerjaan/edit-kategori/${user.id}`}>
                  <FaRegEdit size={16} />
                </Link>
              </Button>
              <ModalDeleteUser
                userId={String(user.id)}
                modalTrigger={
                  <Button className="bg-red-700 hover:bg-red-800">
                    <MdDeleteOutline size={18} />
                  </Button>
                }
              />
            </div>
            <Button className="" asChild>
              <Link to="/manajemen-pengguna/1">
                <IoEyeOutline size={18} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ListUsers;
