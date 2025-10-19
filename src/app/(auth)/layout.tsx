import Image from "next/image";
import { APP_NAME } from "@/shared/constants";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md">
            <Image src="/images/logo.svg" height={20} width={20} alt="Logo" />
          </div>
          {APP_NAME}
        </div>
        {children}
      </div>
    </div>
  );
}
