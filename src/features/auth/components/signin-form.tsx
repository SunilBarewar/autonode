"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type SigninFormValues,
  signinSchema,
} from "@/features/auth/validations/auth-form";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { PATH_NAMES } from "@/shared/constants";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    console.log("Form submitted:", data);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: PATH_NAMES.MAIN,
      },
      {
        onSuccess: () => {
          router.push(PATH_NAMES.MAIN);
        },
        onError: (ctx) => {
          console.error("Sign in error:", ctx.error);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleOAuthSignin = (provider: "github" | "google") => {
    console.log(`Signing in with ${provider}`);
    // Handle OAuth signin logic here
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Signin with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Field>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleOAuthSignin("github")}
              >
                <Image
                  src={"/images/github.svg"}
                  height={20}
                  width={20}
                  alt="Github logo"
                />
                Login with Github
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleOAuthSignin("google")}
              >
                <Image
                  src={"/images/google.svg"}
                  height={20}
                  width={20}
                  alt="Google logo"
                />
                Login with Google
              </Button>
            </Field>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Signing in..." : "Login"}
                </Button>

                <FormDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href={PATH_NAMES.SIGN_UP} className="underline">
                    Sign up
                  </Link>
                </FormDescription>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
