"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface DynamicFranchiseFormProps {
  title: string;
  sourceCta: string;
  countryCode?: string;
  onClose?: () => void;
}

const DynamicFranchiseForm: React.FC<DynamicFranchiseFormProps> = ({
  title,
  sourceCta,
  countryCode = "in",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const insertPromise = supabase.from("franchise_leads").insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: null,
        country: "India",
        investment_range: null,
        source_cta: sourceCta,
        lead_type: "franchise",
      });

      const functionPromise = supabase.functions.invoke("submit-lead", {
        body: {
          ...data,
          city: "",
          country: "India",
          sourceCta,
          leadType: "franchise",
        },
      });

      const [insertResult, functionResult] = await Promise.all([
        insertPromise,
        functionPromise,
      ]);

      // Errors को log करो लेकिन redirect रोको मत
      if (insertResult.error)
        console.error("Insert Error:", insertResult.error);
      if (functionResult.error)
        console.error("Function Error:", functionResult.error);

      // हमेशा redirect करो
      router.push(`/${countryCode.toLowerCase()}/thank-you`);
    } catch (error) {
      console.error("Unexpected Error:", error);
      // फिर भी redirect करो
      router.push(`/${countryCode.toLowerCase()}/thank-you`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white from-yellow-50 via-yellow-100 to-orange-50 p-2 shadow-sm">
      <div className="flex justify-center mb-2">
        <img
          src="/lovable-uploads/cleancraft-icon.png"
          alt="Clean Craft Icon"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="text-black text-xl px-4 py-2 rounded-full text-center font-semibold mb-3 flex justify-center">
        {title}
      </div>

      <div className="bg-white rounded-xl p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="border-gray-300 outline-none focus:ring-0 border-0 rounded-lg h-12"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter 10-digit mobile number"
                      {...field}
                      inputMode="tel"
                      pattern="[0-9]*"
                      maxLength={10}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, "");
                      }}
                      className="border-gray-300 outline-none focus:ring-0 border-0 rounded-lg h-12"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      type="email"
                      className="border-gray-300 outline-none focus:ring-0 border-0 rounded-lg h-12"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 rounded-lg text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Information Package"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DynamicFranchiseForm;
