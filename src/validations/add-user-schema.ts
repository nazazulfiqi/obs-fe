import { z } from "zod";

export const addUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters"),
    username: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters"),
  phone: z
    .string({
      required_error: "Phone Number is required",
    })
    .min(10, "Phone Number must be at least 10 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
    website: z
    .string({
      required_error: "Website is required",
    })
    .min(3, "Website must be at least 3 characters"),
  address: z.object({
    street: z
      .string({
        required_error: "Street is required",
      })
      .min(3, "Street must be at least 3 characters"),
    suite: z
      .string({
        required_error: "Suite is required",
      })
      .min(1, "Suite must be at least 1 character"),
    city: z
      .string({
        required_error: "City is required",
      })
      .min(2, "City must be at least 2 characters"),
    zipcode: z
      .string({
        required_error: "Zipcode is required",
      })
      .min(5, "Zipcode must be at least 5 characters"),
    geo: z.object({
      lat: z
        .string({
          required_error: "Latitude is required",
        })
        .regex(/^[-+]?\d+(\.\d+)?$/, "Latitude must be a valid coordinate"),
      lng: z
        .string({
          required_error: "Longitude is required",
        })
        .regex(/^[-+]?\d+(\.\d+)?$/, "Longitude must be a valid coordinate"),
    }),
  }),
  company: z.object({
    name: z
      .string({
        required_error: "Company name is required",
      })
      .min(3, "Company name must be at least 3 characters"),
    catchPhrase: z.string({
      required_error: "Catch Phrase is required",
    }).min(3, "Catch Phrase must be at least 3 characters"),
    bs: z.string({
      required_error: "Bs is required",
    }).min(3, "Bs must be at least 3 characters"),
  }),
});
