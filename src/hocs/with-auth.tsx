import { requireAuth } from "@/lib/auth-utils";

export function withAuth<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
) {
  return async function AuthenticatedComponent(props: T) {
    await requireAuth();
    return <Component {...props} />;
  };
}
