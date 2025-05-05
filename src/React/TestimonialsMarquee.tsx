"use client";

import React from "react";
import { cn } from "../lib/utils";
import { Marquee } from "../registry/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "Working with Tristan was a game-changer for our project. His attention to detail and creative solutions exceeded our expectations.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Tristan delivered our website ahead of schedule with incredible design and functionality. Highly recommend his services!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "The UI/UX design Tristan created for our app was simply brilliant. Our user engagement has increased by 45% since launch.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Responsive, professional, and incredibly talented. Tristan transformed our outdated site into a modern masterpiece.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Tristan's technical expertise and problem-solving skills are exceptional. He found solutions where others saw roadblocks.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "Our e-commerce conversion rate doubled after implementing Tristan's design recommendations. Worth every penny!",
    img: "https://avatar.vercel.sh/james",
  },
];

// Create fewer items per row to prevent overlap
const firstRow = reviews.slice(0, 3); // Only first 3 items
const secondRow = reviews.slice(3, 6); // Only last 3 items

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div className="flex-shrink-0 w-96 px-5">
      <figure
        className={cn(
          "relative h-36 w-full overflow-hidden rounded-md border p-4",
          "border-[var(--white-icon-tr)] bg-[#1414149c] hover:bg-[var(--white-icon-tr)]",
          "transition duration-300 ease-in-out"
        )}
      >
        <div className="flex flex-row items-center gap-3 mb-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-[var(--white)]">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-[var(--white-icon)]">{username}</p>
          </div>
        </div>
        <blockquote className="mt-1 text-sm text-[var(--white-icon)] line-clamp-3">{body}</blockquote>
      </figure>
    </div>
  );
};

export default function TestimonialsMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="py-3">
        <Marquee pauseOnHover className="flex [--duration:45s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
          {/* Repeat the same items to ensure continuous flow */}
          {firstRow.map((review) => (
            <ReviewCard key={`${review.username}-repeat`} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="py-3">
        <Marquee reverse pauseOnHover className="flex [--duration:45s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
          {/* Repeat the same items to ensure continuous flow */}
          {secondRow.map((review) => (
            <ReviewCard key={`${review.username}-repeat`} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[var(--background)]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[var(--background)]"></div>
    </div>
  );
} 