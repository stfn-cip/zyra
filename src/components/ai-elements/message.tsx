import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import type { ComponentProps, HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user"
        ? "is-user [&>div]:max-w-[80%]"
        : "is-assistant flex-row-reverse justify-end",
      className,
    )}
    {...props}
  />
);

const messageContentVariants = cva(
  "text-foreground flex flex-col gap-2 overflow-hidden rounded-2xl px-4 py-3",
  {
    variants: {
      variant: {
        default: cn(
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground group-[.is-user]:text-sm",
          "group-[.is-assistant]:text-foreground group-[.is-assistant]:bg-transparent",
        ),
        error:
          "group-[.is-assistant]:text-destructive group-[.is-assistant]:bg-destructive/20 group-[.is-assistant]:border group-[.is-assistant]:border-destructive/50 [&>div]:max-w-[80%]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>;

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
