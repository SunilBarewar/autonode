import { requireNoAuth } from "@/lib/auth-utils";

export function withoutAuth<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
) {
  return async function UnauthenticatedComponent(props: T) {
    await requireNoAuth();

    return <Component {...props} />;
  };
}
