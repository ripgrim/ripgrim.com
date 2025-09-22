"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchLastFmData } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { LastFmImage } from "@/types/lastfm";

export function NowPlaying({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);

  const {
    data: lastFmData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lastfm-recent-tracks"],
    queryFn: fetchLastFmData,
    refetchInterval: 10_000,
    staleTime: 30_000,
  });

  const track = lastFmData?.recenttracks?.track?.[0];
  const isPlaying = track?.["@attr"]?.nowplaying === "true";

  const getImageUrl = (images: LastFmImage[] | undefined) => {
    const largeImage = images?.find((img: LastFmImage) => img.size === "large");
    const mediumImage = images?.find(
      (img: LastFmImage) => img.size === "medium"
    );
    return largeImage?.["#text"] || mediumImage?.["#text"] || null;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex animate-pulse items-center justify-between">
          <div className="flex gap-4">
            <div className="h-16 w-16 bg-neutral-200 dark:bg-neutral-800" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="text-neutral-500 text-sm">
            {error?.message || "No track information available"}
          </div>
          <button
            className="p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => refetch()}
            type="button"
          >
            <RefreshCw className="h-4 w-4 text-neutral-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative hidden overflow-hidden bg-neutral-200/30 p-[1px] lg:block dark:bg-black",
          className
        )}
      >
        <div className="relative block bg-white p-4 dark:bg-black">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden">
                {(() => {
                  const imageUrl = getImageUrl(track.image);
                  return imageUrl ? (
                    <Image
                      alt={track.album?.["#text"] || "Album artwork"}
                      className="object-cover"
                      height={64}
                      src={imageUrl}
                      width={64}
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                      <span className="text-neutral-500 dark:text-neutral-400">
                        ?
                      </span>
                    </div>
                  );
                })()}
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="flex items-center gap-2">
                  <div className="text-neutral-500 text-sm dark:text-neutral-400">
                    {isPlaying ? "Now playing" : "Last played"}
                  </div>
                </div>
                <div className="mt-1 truncate font-medium">{track.name}</div>
                <div className="truncate text-neutral-500 text-sm dark:text-neutral-400">
                  {track.artist?.["#text"]}
                </div>
              </div>
            </div>

            <button
              aria-label="Refresh now playing"
              className="p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              disabled={isLoading}
              onClick={() => refetch()}
              type="button"
            >
              <RefreshCw
                className={`h-4 w-4 text-neutral-500 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 p-4 transition-all duration-200 hover:border-neutral-300 lg:hidden dark:border-neutral-800 dark:hover:border-neutral-700">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden">
              {(() => {
                const imageUrl = getImageUrl(track.image);
                return imageUrl ? (
                  <Image
                    alt={track.album?.["#text"] || "Album artwork"}
                    className="object-cover"
                    height={64}
                    src={imageUrl}
                    width={64}
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      ?
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-2">
                <div className="text-neutral-500 text-sm dark:text-neutral-400">
                  {isPlaying ? "Now playing" : "Last played"}
                </div>
              </div>
              <div className="mt-1 truncate font-medium">{track.name}</div>
              <div className="truncate text-neutral-500 text-sm dark:text-neutral-400">
                {track.album?.["#text"]}
              </div>
            </div>
          </div>

          <button
            aria-label="Refresh now playing"
            className="p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            disabled={isLoading}
            onClick={() => refetch()}
            type="button"
          >
            <RefreshCw
              className={`h-4 w-4 text-neutral-500 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
