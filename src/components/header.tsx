"use client";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div>
      <div className="fixed top-0 flex flex-row items-center justify-end px-2 py-1">
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
