"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ImageUpload from "@/components/NextImgUploder/ImageUpload";
import { useState } from "react";
import ImagePreviewer from "@/components/NextImgUploder/imagePreviewer";
import { ShopFunction } from "./shopFunction";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters"),
  businessLicenseNumber: z.string().min(2, "Business License Number required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  website: z.string().url("Invalid website URL"),
  establishedYear: z.string().min(4, "Enter valid year"),
  taxIdentificationNumber: z.string().min(2, "Tax ID is required"),
  socialMediaLinks: z.object({
    facebook: z.string().url("Invalid Facebook URL"),
    twitter: z.string().url("Invalid Twitter URL"),
    instagram: z.string().url("Invalid Instagram URL"),
  }),
  servicesOffered: z.string().min(5, "Please describe your service"),
  logo: z
    .any()
    .refine((file) => file && file.length === 1, "Logo file is required"),
});

const CreateShopPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: "",
      businessLicenseNumber: "",
      address: "",
      contactNumber: "",
      website: "",
      establishedYear: "",
      taxIdentificationNumber: "",
      socialMediaLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
      servicesOffered: "",
      logo: [],
    },
  });

  const {
    formState: { isSubmitting, errors },
    setValue,
  } = form;

  // Submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const servicesOffered = data?.servicesOffered
      .split(",")
      .map((service) => service.trim())
      .filter((service) => service !== "");

    const modifiedData = {
      ...data,
      servicesOffered: servicesOffered,
      establishedYear: Number(data.establishedYear),
    };

    console.log("Modified Data:", modifiedData);

    try {
      if (imageFiles.length === 0) {
        toast.error("Logo file is required");
        return;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", imageFiles[0]);

      const res = await ShopFunction(formData);

      console.log("API Response:", res);

      if (res && res.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed to create shop");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center underline">
        Create Shop
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Shop Name & License Number */}
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter license number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address & Contact */}
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Website & Established Year */}
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter established year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tax ID & Facebook */}
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="taxIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Identification Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Tax ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Facebook URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Twitter & Instagram */}
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Twitter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Instagram URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Service Offered */}
          <FormField
            control={form.control}
            name="servicesOffered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Offered</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the service you offer, separated by commas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Preview */}
          <ImagePreviewer
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />

          {/* Image Upload (show only if no preview image) */}
          {imagePreview.length < 1 && (
            <ImageUpload
              setImageFiles={(files) => {
                setImageFiles(files);
                setValue("logo", files, { shouldValidate: true }); // Bind with react-hook-form
              }}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
              label="Upload Logo"
            />
          )}

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>

      {/* Debug errors */}
      {Object.keys(errors).length > 0 && (
        <pre className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          
          {JSON.stringify(errors, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default CreateShopPage;
