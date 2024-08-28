import React from "react";
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
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ModalDetailUserProps {
  modalTrigger: React.ReactNode;
  user: User;
}

export const ModalDetailUser = ({
  modalTrigger,
  user,
}: ModalDetailUserProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className="p-12 text-center sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Avatar className="mx-auto" style={{ width: 70, height: 70 }}>
              <AvatarImage src={`https://picsum.photos/seed/${user.id}/50`} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h4 className="text-center text-2xl py-4">{user.name}</h4>
          </DialogTitle>
          <DialogDescription className="text-black">
            <div>
              <h1 className="text-lg font-semibold py-2 ">
                Personal Information
              </h1>
              <div className="grid grid-cols-2 gap-1">
                <p>
                  <span className="font-semibold">Username</span> :{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-semibold">Phone</span> : {user.phone}
                </p>
                <p>
                  <span className="font-semibold">Email</span> : {user.email}
                </p>
                <p>
                  <span className="font-semibold">Website</span> :{" "}
                  {user.website}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold pt-4 pb-1 ">Address</h1>
              <p>
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </p>
            </div>

            <div>
              <h1 className="text-lg font-semibold pt-4 pb-1 ">Company</h1>
              <p>{user.company.name}</p>
              <p>
                <em>
                  {user.company.catchPhrase} - {user.company.bs}
                </em>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
