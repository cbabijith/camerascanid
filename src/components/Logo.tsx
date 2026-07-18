"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
  size = "default",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "default" | "lg";
}) {
  const sizes = {
    sm: { img: "w-24 h-10", text: "text-base", sub: "text-[8px]" },
    default: { img: "w-28 h-12", text: "text-lg", sub: "text-[9px]" },
    lg: { img: "w-40 h-17", text: "text-2xl", sub: "text-xs" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative flex-shrink-0", s.img)}>
        <Image
          src="/camerasc.svg"
          alt="Camera Scan"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold tracking-tight text-foreground", s.text)}>
            Camera Scan
          </span>
          <span className={cn("text-gray-500 font-medium", s.sub)}>
            Since 1993
          </span>
        </div>
      )}
    </div>
  );
}
