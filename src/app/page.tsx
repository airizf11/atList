// src/app/page.tsx
import { SignInButton } from "@/components/auth-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">StreamerTools</CardTitle>
          <CardDescription>
            Your all-in-one dashboard to manage your live streams.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">
            Get started by logging in
          </p>
          <SignInButton />
        </CardContent>
      </Card>
    </main>
  );
}
