import Layout from "@/components/layout/Layout";
import ListUsers from "@/components/ListUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const ListUsersModule: React.FC = () => {
  return (
    <Layout>
      <section className="flex items-center justify-between my-4">
        <div className="relative w-1/2 md:w-1/3">
          <Input type="text" placeholder="Cari Pengguna" className="pl-10" />
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
        <ListUsers />
      </div>
    </Layout>
  );
};

export default ListUsersModule;
