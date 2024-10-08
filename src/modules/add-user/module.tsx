import Layout from '@/components/layout/Layout';
import ButtonLoading from '@/components/loading-button';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserSchema } from '@/validations/add-user-schema';
import { z } from 'zod';
import axios from 'axios';
import { addUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const AddUserModule = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof addUserSchema>) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_API_URL}/users`, data);

      dispatch(addUser(response.data));
      form.reset();
      navigate('/');
      toast({
        title: 'User added successfully',
        description: 'User added successfully',
      });
    } catch (error) {
      console.error('Failed to add user:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="grid gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-6"
            >
              <div>
                <h2 className="font-semibold text-2xl">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Website */}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-2xl">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Street */}
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Suite */}
                  <FormField
                    control={form.control}
                    name="address.suite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suite</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Suite" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* City */}
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Zipcode */}
                  <FormField
                    control={form.control}
                    name="address.zipcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Zipcode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Latitude */}
                  <FormField
                    control={form.control}
                    name="address.geo.lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Latitude" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Longitude */}
                  <FormField
                    control={form.control}
                    name="address.geo.lng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Longitude" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-2xl">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Company */}
                  <FormField
                    control={form.control}
                    name="company.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Catch Phrase */}
                  <FormField
                    control={form.control}
                    name="company.catchPhrase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catch Phrase</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Catch Phrase" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* BS */}
                  <FormField
                    control={form.control}
                    name="company.bs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BS</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter BS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="my-3 flex justify-end gap-3">
                <Link to="/">
                  <Button className="hover:bg-slate-950 border-white text-white border-2 bg-slate-900 shadow-md">
                    Back
                  </Button>
                </Link>
                <Dialog>
                  {loading ? (
                    <ButtonLoading className="bg-green-500 " />
                  ) : (
                    <DialogTrigger asChild>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Add User
                      </Button>
                    </DialogTrigger>
                  )}
                  <DialogContent className="z-[9999] p-12 text-center sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Are you sure the information is correct?
                      </DialogTitle>
                      <div className="py-3">
                        <Separator className="bg-green-500 mx-auto h-1 w-1/3 rounded-full" />
                      </div>
                      <DialogDescription className="text-center">
                        Please review the user information carefully.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex w-full justify-between gap-2 md:gap-0">
                      <DialogClose className="w-full">
                        <Button variant="outline" className="w-full">
                          Review Again
                        </Button>
                      </DialogClose>
                      <DialogClose className="w-full">
                        <Button
                          onClick={() => form.handleSubmit(onSubmit)()}
                          type="submit"
                          className="bg-green-500 hover:bg-green-600 w-full text-white"
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default AddUserModule;
