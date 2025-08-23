"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BodyText, Caption, SectionHeading } from "@/components/ui/typography";
import { useRouter, useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const countryCode = params?.countryCode || "in";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const handlePaymentRedirect = () => {
    window.open(
      "https://cleancraft.mojo.page/best-laundry-training-institute-in-india",
      "_blank"
    );
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const insertData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: "",
        country: "India",
        source_cta: "Course Registration",
        lead_type: "course",
      };

      const { error } = await supabase
        .from("franchise_leads")
        .insert(insertData);
      if (error) throw error;

      const { error: emailError } = await supabase.functions.invoke(
        "submit-lead",
        {
          body: {
            ...data,
            country: "India",
            sourceCta: "Course Registration",
            leadType: "course",
          },
        }
      );

      if (emailError) console.warn("Email sending failed:", emailError);

      // Navigate to Next.js thank you page
      router.push(`/${countryCode.toLowerCase()}/thank-you?sourceCta=course`);

      handlePaymentRedirect();
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert(
        "There was an error submitting your registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="section-padding bg-brand-blue-light"
      id="registration-form"
    >
      <div className="container-enhanced">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionHeading className="text-gray-900 mb-4">
              Start Your Laundry{" "}
              <span className="text-brand-blue">Business Journey</span>
            </SectionHeading>
            <BodyText className="text-gray-600">
              Join India's premier laundry & dry cleaning training program
            </BodyText>
          </div>

          <Card className="shadow-elevation-2 border-0">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="input-enhanced h-12"
                            {...field}
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
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            className="input-enhanced h-12"
                            {...field}
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
                        <FormLabel className="text-body-sm font-medium text-gray-700">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="input-enhanced h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Registering..."
                        : "Register for Training"}
                    </Button>
                  </div>

                  <Caption className="text-gray-500 text-center block">
                    By registering, you'll receive course details and payment
                    instructions via email.
                  </Caption>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
