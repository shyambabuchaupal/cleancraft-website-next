// src/app/policies/[slug]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useStrapiPolicies } from "@/hooks/useStrapi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import { StrapiPolicy } from "@/types/strapi";

export default function PolicyDetailsPage() {
  const params = useParams<{ slug: string; countryCode: string }>();
  const rawSlug = params?.slug;
  const countryCode = params?.countryCode;
  const { data: policies, isLoading } = useStrapiPolicies();

  // ✅ Decode URL and normalize slug
  const slug = rawSlug ? decodeURIComponent(rawSlug).toLowerCase().trim() : "";

  console.log(
    `🔍 Policy Detail Page - Raw Slug: ${rawSlug}, Decoded: ${slug}, Country: ${countryCode}`
  );
  console.log(`📊 Policies loading: ${isLoading}`);
  console.log(
    `📋 All policies:`,
    policies?.map((p: StrapiPolicy) => ({ slug: p.slug, name: p.name }))
  );

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  // ✅ Enhanced policy matching with better slug normalization

  // Helper function to normalize slugs for comparison
  const normalizeSlug = (str: string) =>
    str.toLowerCase().replace(/[&\s]/g, "-").replace(/-+/g, "-");

  // Direct match first
  let policy = policies?.find((p: StrapiPolicy) => p.slug === slug);

  // Case-insensitive match (most common issue)
  if (!policy) {
    policy = policies?.find(
      (p: StrapiPolicy) => p.slug.toLowerCase() === slug.toLowerCase()
    );
  }

  // Normalized comparison (handles special characters like &)
  if (!policy) {
    const normalizedTargetSlug = normalizeSlug(slug);
    policy = policies?.find(
      (p: StrapiPolicy) => normalizeSlug(p.slug) === normalizedTargetSlug
    );
  }

  // Try without hyphens/underscores/special chars
  if (!policy) {
    const cleanSlug = slug.replace(/[-_&\s]/g, "").toLowerCase();
    policy = policies?.find(
      (p: StrapiPolicy) =>
        p.slug.replace(/[-_&\s]/g, "").toLowerCase() === cleanSlug
    );
  }

  // Try partial matching (starts with)
  if (!policy) {
    policy = policies?.find(
      (p: StrapiPolicy) =>
        p.slug.toLowerCase().startsWith(slug.toLowerCase()) ||
        slug.toLowerCase().startsWith(p.slug.toLowerCase())
    );
  }

  console.log(`🔍 Matching attempts for slug: "${slug}"`);
  console.log(
    `📋 Available policies:`,
    policies?.map((p: StrapiPolicy) => ({
      name: p.name,
      slug: p.slug,
      normalized: normalizeSlug(p.slug),
      clean: p.slug.replace(/[-_&\s]/g, "").toLowerCase(),
    }))
  );

  console.log(
    `🎯 Found policy:`,
    policy
      ? {
          name: policy.name,
          slug: policy.slug,
          matchMethod: policy
            ? "Found via one of the matching strategies"
            : "Not found",
        }
      : null
  );

  if (!policy) {
    console.log(`❌ Policy not found for slug: ${slug}`);
    console.log(
      `📋 Available slugs:`,
      policies?.map((p: StrapiPolicy) => p.slug)
    );
    return (
      <>
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-12 md:py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Policy not found
            </h1>
            <p className="mt-4 text-gray-600">Looking for: {slug}</p>
            <p className="text-sm text-gray-500 mt-2">
              Available: {policies?.map((p: StrapiPolicy) => p.slug).join(", ")}
            </p>
          </div>
        </div>
      </>
    );
  }

  const policyName = policy.name;
  const policyDescription = policy.description;

  const getEffectiveDate = () => {
    const dateStr = policy.publishedAt;
    const date = dateStr ? new Date(dateStr) : null;
    return date && !isNaN(date.getTime())
      ? format(date, "MMM d, yyyy")
      : "Date not available";
  };

  return (
    <>
      <SEO
        slug={`policies/${policy.slug}`}
        defaultTitle={`${policyName} | CleanCraft`}
        defaultDescription={policyDescription}
      />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                {policyName}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Effective: {getEffectiveDate()}</span>
              </div>

              {/* ✅ Render policy.content safely */}
              <div className="prose max-w-none space-y-4">
                {/* ✅ Enhanced content rendering */}
                {policy.content && (
                  <div className="prose max-w-none">
                    {/* String content */}
                    {typeof policy.content === "string" && (
                      <div
                        dangerouslySetInnerHTML={{ __html: policy.content }}
                      />
                    )}

                    {/* Array content (Strapi rich text) */}
                    {Array.isArray(policy.content) &&
                      policy.content.map(
                        (
                          block: {
                            type: string;
                            children?: {
                              text: string;
                              bold?: boolean;
                              italic?: boolean;
                            }[];
                            level?: number;
                            items?: { children?: { text: string }[] }[];
                          },
                          index: number
                        ) => {
                          if (block.type === "paragraph") {
                            const text =
                              block.children
                                ?.map(
                                  (child: {
                                    text: string;
                                    bold?: boolean;
                                    italic?: boolean;
                                  }) => {
                                    let content = child.text;
                                    if (child.bold)
                                      content = `<strong>${content}</strong>`;
                                    if (child.italic)
                                      content = `<em>${content}</em>`;
                                    return content;
                                  }
                                )
                                .join("") || "";
                            return (
                              <p
                                key={index}
                                dangerouslySetInnerHTML={{ __html: text }}
                                className="mb-4"
                              />
                            );
                          }

                          if (block.type === "heading") {
                            const text =
                              block.children
                                ?.map((child: { text: string }) => child.text)
                                .join("") || "";
                            const level = block.level || 2;

                            if (level === 1)
                              return (
                                <h1
                                  key={index}
                                  className="text-2xl font-bold mb-4"
                                >
                                  {text}
                                </h1>
                              );
                            if (level === 2)
                              return (
                                <h2
                                  key={index}
                                  className="text-xl font-bold mb-3"
                                >
                                  {text}
                                </h2>
                              );
                            if (level === 3)
                              return (
                                <h3
                                  key={index}
                                  className="text-lg font-semibold mb-2"
                                >
                                  {text}
                                </h3>
                              );
                            return (
                              <h4
                                key={index}
                                className="text-base font-semibold mb-2"
                              >
                                {text}
                              </h4>
                            );
                          }

                          if (block.type === "list") {
                            return (
                              <ul key={index} className="list-disc ml-6 mb-4">
                                {block.items?.map(
                                  (
                                    item: { children?: { text: string }[] },
                                    itemIndex: number
                                  ) => (
                                    <li key={itemIndex} className="mb-2">
                                      {item.children
                                        ?.map(
                                          (child: { text: string }) =>
                                            child.text
                                        )
                                        .join("")}
                                    </li>
                                  )
                                )}
                              </ul>
                            );
                          }

                          return null;
                        }
                      )}

                    {/* Object content */}
                    {typeof policy.content === "object" &&
                      !Array.isArray(policy.content) && (
                        <div>
                          <p className="text-gray-600">
                            This policy content is available but in an
                            unsupported format.
                          </p>
                          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                            {JSON.stringify(policy.content, null, 2)}
                          </pre>
                        </div>
                      )}
                  </div>
                )}

                {/* Fallback if no content */}
                {!policy.content && (
                  <div className="text-gray-500 text-center py-8">
                    <p>Policy content is not available at this time.</p>
                    <p className="text-sm mt-2">
                      Please contact support for more information.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
