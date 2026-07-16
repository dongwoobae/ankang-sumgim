"use client";

import Link from "next/link";
import { navGroups } from "./AdminSidebarNavGroups";

type SidebarNavProps = {
  collapsed: boolean;
  pathname: string;
  onNavigate: () => void;
};

export default function SidebarNav({ collapsed, pathname, onNavigate }: SidebarNavProps) {
  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
      {navGroups.map((group) => (
        <div key={group.label}>
          {!collapsed && (
            <p className="text-[#5A7A99] text-[10px] font-semibold tracking-widest px-2 mb-1.5 uppercase">
              {group.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${collapsed ? "justify-center" : ""}
                      ${
                        active
                          ? "bg-[#1A56A0] text-[#FFFFFF] font-medium"
                          : "text-[#A8C4E0] hover:bg-[#1A2E4A] hover:text-[#E8A020]"
                      }`}
                  >
                    {item.icon}
                    {!collapsed && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
