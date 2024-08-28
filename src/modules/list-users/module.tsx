import Layout from "@/components/layout/Layout";
import ListUsers from "@/components/ListUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust path as necessary
import { User } from "@/types/user"; // Adjust path as necessary
import { setUsers } from "@/redux/userSlice";
import axios from "axios";

const ListUsersModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>("http://localhost:4000/users");
      dispatch(setUsers(response.data));
    };

    fetchUsers();
  }, [dispatch]);

  console.log(users);

  // Filter users based on the search term
  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredUsers);

  return (
    <Layout>
      <section className="flex items-center justify-between my-4">
        <div className="relative w-1/2 md:w-1/3">
          <Input
            type="text"
            placeholder="Cari Pengguna"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch className="text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-1 px-3 py-2 text-base font-normal text-white shadow-md hover:text-white"
            asChild
          >
            <Link to="/add-user">
              <CiCirclePlus size={20} />
              <p className="leading-none">Add User</p>
            </Link>
          </Button>
        </div>
      </section>
      <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 md:grid-cols-3">
        {/* Pass filtered users to ListUsers */}
        <ListUsers users={filteredUsers} />
      </div>
    </Layout>
  );
};

export default ListUsersModule;
