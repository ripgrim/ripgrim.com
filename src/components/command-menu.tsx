"use client";

import {
  ArrowClockwise,
  ArrowLeft,
  ArrowUp,
  Article,
  Check,
  Copy,
  EnvelopeSimple,
  House,
  Link,
  Moon,
  Printer,
  Sun,
} from "@phosphor-icons/react";
import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";

type Action = {
  name: string;
  action: () => void;
  icon?: React.ReactNode;
  keywords?: string[];
  showOn?: "home" | "blog" | "all";
  group: string;
  keepOpen?: boolean;
};

export function CommandMenu() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [completedActions, setCompletedActions] = React.useState<Set<string>>(
    new Set()
  );
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef(null);

  const isOnBlog = pathname?.startsWith("/blog");
  const isOnHome = pathname === "/";

  React.useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      inputRef?.current?.focus();
    } else {
      // Reset completed actions when menu closes
      setCompletedActions(new Set());
    }
  }, [open]);

  const runCommand = (action: Action) => {
    if (!action.keepOpen) {
      setOpen(false);
    }

    if (action.keepOpen) {
      setCompletedActions((prev) => new Set([...prev, action.name]));
      // Clear the completed status after 2 seconds
      const CompletedFeedbackDuration = 2000;
      setTimeout(() => {
        setCompletedActions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(action.name);
          return newSet;
        });
      }, CompletedFeedbackDuration);
    }

    action.action();
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const actions: Action[] = [
    // Navigation
    {
      name: "Go to Home",
      action: () => router.push("/"),
      icon: <House size={16} />,
      keywords: ["home", "main", "index"],
      showOn: "blog",
      group: "Navigation",
    },
    {
      name: "Go to Blog",
      action: () => router.push("/blog"),
      icon: <Article size={16} />,
      keywords: ["blog", "posts", "writing", "articles"],
      showOn: "home",
      group: "Navigation",
    },

    // Theme
    {
      name: `${theme === "dark" ? "Light" : "Dark"} Theme`,
      action: () => toggleTheme(),
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      keywords: ["theme", "dark", "light", "mode", "appearance"],
      showOn: "all",
      group: "Theme",
    },

    // Blog Actions
    {
      name: "Refresh Blog",
      action: () => router.refresh(),
      icon: <ArrowClockwise size={16} />,
      keywords: ["refresh", "reload", "update"],
      showOn: "blog",
      group: "Blog Actions",
    },
    {
      name: "Copy Page URL",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
      },
      icon: <Link size={16} />,
      keywords: ["share", "copy", "url"],
      showOn: "blog",
      group: "Blog Actions",
      keepOpen: true,
    },

    // Home Actions
    // {
    //   name: "Scroll to Top",
    //   action: () => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   },
    //   icon: <ArrowUp size={16} />,
    //   keywords: ["scroll", "top", "beginning"],
    //   showOn: "home",
    //   group: "Quick Actions",
    // },
    // {
    //   name: "Copy Email",
    //   action: () => {
    //     navigator.clipboard.writeText("hello@example.com");
    //   },
    //   icon: <EnvelopeSimple size={16} />,
    //   keywords: ["contact", "email", "reach"],
    //   showOn: "home",
    //   group: "Quick Actions",
    //   keepOpen: true,
    // },

    // Utilities
    {
      name: "Copy Current URL",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
      },
      icon: <Copy size={16} />,
      keywords: ["copy", "url", "link", "share"],
      showOn: "all",
      group: "Utilities",
      keepOpen: true,
    },
    {
      name: "Reload Page",
      action: () => window.location.reload(),
      icon: <ArrowClockwise size={16} />,
      keywords: ["reload", "refresh", "f5"],
      showOn: "all",
      group: "Utilities",
    },
    {
      name: "Go Back",
      action: () => router.back(),
      icon: <ArrowLeft size={16} />,
      keywords: ["back", "previous", "history"],
      showOn: "all",
      group: "Utilities",
    },
    {
      name: "Print Page",
      action: () => window.print(),
      icon: <Printer size={16} />,
      keywords: ["print", "pdf"],
      showOn: "all",
      group: "Utilities",
    },
  ];

  // Filter actions based on current page
  const filteredActions = actions.filter((action) => {
    if (action.showOn === "all") {
      return true;
    }
    if (action.showOn === "home" && isOnHome) {
      return true;
    }
    if (action.showOn === "blog" && isOnBlog) {
      return true;
    }
    return false;
  });

  // Group actions by their group property
  const groupedActions = filteredActions.reduce(
    (groups, action) => {
      if (!groups[action.group]) {
        groups[action.group] = [];
      }
      groups[action.group].push(action);
      return groups;
    },
    {} as Record<string, Action[]>
  );

  if (!open) {
    return null;
  }

  return (
    <Command.Dialog
      label="Global Command Menu"
      onOpenChange={setOpen}
      open={open}
    >
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="raycast">
            <Command onValueChange={(v) => setValue(v)} value={value}>
              <div cmdk-raycast-top-shine="" />
              <Command.Input
                autoFocus
                placeholder="Search for apps and commands..."
                ref={inputRef}
              />
              <hr cmdk-raycast-loader="" />
              <Command.List className="pb-16" ref={listRef}>
                <Command.Empty>No results found.</Command.Empty>

                {Object.entries(groupedActions).map(
                  ([groupName, groupActions]) => (
                    <Command.Group heading={groupName} key={groupName}>
                      {groupActions.map((action) => {
                        const isCompleted = completedActions.has(action.name);
                        return (
                          <Item
                            key={action.name}
                            keywords={action.keywords}
                            onSelect={() => runCommand(action)}
                            value={action.name}
                          >
                            {isCompleted ? (
                              <Check size={16} />
                            ) : (
                              action.icon && <span>{action.icon}</span>
                            )}
                            {action.name}
                          </Item>
                        );
                      })}
                    </Command.Group>
                  )
                )}
              </Command.List>

              {/* <div
                className="border-neutral-200 border-t bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800"
                cmdk-raycast-footer=""
              >
                <div className="flex items-center justify-between">
                  {theme === "dark" ? (
                    <RaycastDarkIcon />
                  ) : (
                    <RaycastLightIcon />
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-md bg-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                      cmdk-raycast-open-trigger=""
                      type="button"
                    >
                      {(() => {
                        if (isOnBlog) {
                          return "Blog Page";
                        }
                        if (isOnHome) {
                          return "Home Page";
                        }
                        return "Current Page";
                      })()}
                      <kbd className="ml-2 rounded bg-neutral-300 px-1.5 py-0.5 text-xs dark:bg-neutral-600">
                        ↵
                      </kbd>
                    </button>

                    <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-600" />

                    <button
                      className="rounded-md bg-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                      cmdk-raycast-subcommand-trigger=""
                      type="button"
                    >
                      Actions
                      <kbd className="ml-2 rounded bg-neutral-300 px-1.5 py-0.5 text-xs dark:bg-neutral-600">
                        ESC
                      </kbd>
                    </button>
                  </div>
                </div>
              </div> */}
            </Command>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}

function Item({
  children,
  value,
  keywords,
  onSelect,
}: {
  children: React.ReactNode;
  value: string;
  keywords?: string[];
  onSelect?: () => void;
}) {
  return (
    <Command.Item
      keywords={keywords}
      onSelect={
        onSelect ||
        (() => {
          // No operation
        })
      }
      value={value}
    >
      {children}
    </Command.Item>
  );
}

function RaycastLightIcon() {
  return (
    <svg
      fill="none"
      height="1024"
      viewBox="0 0 1024 1024"
      width="1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Raycast Light Icon</title>
      <path
        clipRule="evenodd"
        d="M934.302 511.971L890.259 556.017L723.156 388.902V300.754L934.302 511.971ZM511.897 89.5373L467.854 133.583L634.957 300.698H723.099L511.897 89.5373ZM417.334 184.275L373.235 228.377L445.776 300.923H533.918L417.334 184.275ZM723.099 490.061V578.209L795.641 650.755L839.74 606.652L723.099 490.061ZM697.868 653.965L723.099 628.732H395.313V300.754L370.081 325.987L322.772 278.675L278.56 322.833L325.869 370.146L300.638 395.379V446.071L228.097 373.525L183.997 417.627L300.638 534.275V634.871L133.59 467.925L89.4912 512.027L511.897 934.461L555.996 890.359L388.892 723.244H489.875L606.516 839.892L650.615 795.79L578.074 723.244H628.762L653.994 698.011L701.303 745.323L745.402 701.221L697.868 653.965Z"
        fill="#FF6363"
        fillRule="evenodd"
      />
    </svg>
  );
}

function RaycastDarkIcon() {
  return (
    <svg
      fill="none"
      height="1024"
      viewBox="0 0 1024 1024"
      width="1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Raycast Dark Icon</title>
      <path
        clipRule="evenodd"
        d="M301.144 634.799V722.856L90 511.712L134.244 467.804L301.144 634.799ZM389.201 722.856H301.144L512.288 934L556.34 889.996L389.201 722.856ZM889.996 555.956L934 511.904L512.096 90L468.092 134.052L634.799 300.952H534.026L417.657 184.679L373.605 228.683L446.065 301.144H395.631V628.561H723.048V577.934L795.509 650.395L839.561 606.391L723.048 489.878V389.105L889.996 555.956ZM323.17 278.926L279.166 322.978L326.385 370.198L370.39 326.145L323.17 278.926ZM697.855 653.61L653.994 697.615L701.214 744.834L745.218 700.782L697.855 653.61ZM228.731 373.413L184.679 417.465L301.144 533.93V445.826L228.731 373.413ZM578.174 722.856H490.07L606.535 839.321L650.587 795.269L578.174 722.856Z"
        fill="#FF6363"
        fillRule="evenodd"
      />
    </svg>
  );
}
