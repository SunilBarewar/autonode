import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | {
      onNew?: () => void;
      newButtonHref?: never;
    }
  | {
      onNew?: never;
      newButtonHref?: string;
    }
  | {
      onNew?: never;
      newButtonHref?: never;
    }
);

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  console.log("description", description);
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {onNew && !newButtonHref && (
        <Button disabled={disabled || isCreating} size={"sm"} onClick={onNew}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button asChild disabled={disabled || isCreating} size={"sm"}>
          <Link href={newButtonHref}></Link>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  pagination,
  search,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 ">
      <div className="mx-auto max-w-screen-xl w-full h-full flex flex-col gapy-y-8">
        {header}
        <div className="flex flex-col gap-y-4">
          {search}
          {children}
        </div>
      </div>
    </div>
  );
};
