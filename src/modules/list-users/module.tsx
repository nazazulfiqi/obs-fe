import Layout from '@/components/layout/Layout';
import ListUsers from '@/components/ListUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { User } from '@/types/user';
import { setUsers } from '@/redux/userSlice';
import axios from 'axios';
import { SkeletonCard } from '@/components/skeleton-card';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const ListUsersModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await axios.get<User[]>(`${BASE_API_URL}/users`);
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <section className="flex items-center justify-between my-4">
        <div className="relative w-1/2 md:w-1/3">
          <Input
            type="text"
            placeholder="Search User"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch className="text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-green-500 hover:bg-green-600 text-base text-white shadow-md hover:text-white font-semibold"
            asChild
          >
            <Link to="/add-user" className="flex items-center justify-center">
              <CiCirclePlus size={20} className="mr-2" /> Add User
            </Link>
          </Button>
        </div>
      </section>

      {loading ? (
        <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 md:grid-cols-3 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 md:grid-cols-3">
          <ListUsers users={filteredUsers} />
        </div>
      ) : (
        <h2 className="text-center text-base mt-16">No user found</h2>
      )}
    </Layout>
  );
};

export default ListUsersModule;
