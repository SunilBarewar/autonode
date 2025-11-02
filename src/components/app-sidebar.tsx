"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
import { authClient } from "@/lib/auth-client";
import { APP_NAME, PATH_NAMES, PRODUCT_SLUGS } from "@/shared/constants";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: PATH_NAMES.WORKFLOWS,
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: PATH_NAMES.EXECUTIONS,
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: PATH_NAMES.CREDENTIALS,
      },
    ],
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  const footerItems = [
    {
      title: "Upgrade to Pro",
      icon: StarIcon,
      isVisible: !hasActiveSubscription && !isLoading,
      onClick() {
        authClient.checkout({ slug: PRODUCT_SLUGS.NODE_TRIGGER });
      },
    },
    {
      title: "Billing Portal",
      icon: CreditCardIcon,
      isVisible: true,
      onClick() {
        authClient.customer.portal();
      },
    },
    {
      title: "Sign Out",
      icon: LogOutIcon,
      isVisible: true,

      onClick: () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push(PATH_NAMES.SIGN_IN);
            },
          },
        });
        queryClient.clear();
      },
    },
  ];

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={PATH_NAMES.WORKFLOWS}>
              <Image
                src="/images/logo.svg"
                height={25}
                width={25}
                alt={APP_NAME}
              />
              <span className="font-semibold text-sm ml-4">{APP_NAME}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {menuItems.map((menu) => (
          <SidebarGroup key={menu.title}>
            <SidebarMenu>
              {menu.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={
                      item.url === PATH_NAMES.MAIN
                        ? pathname === PATH_NAMES.MAIN
                        : pathname.startsWith(item.url)
                    }
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url} prefetch>
                      {item.icon && <item.icon className="size-4" />}

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => {
            return (
              item.isVisible && (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="gap-x-4 h-10 px-4"
                    onClick={item.onClick}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
