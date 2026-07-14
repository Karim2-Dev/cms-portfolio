import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);
export default clerkMiddleware(async (auth, request) => {
  const { sessionClaims, userId } = await auth();
  console.log("USER ID:", userId);
  console.log("CLAIMS:", JSON.stringify(sessionClaims, null, 2));

  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (isAdminRoute(request) && sessionClaims?.metadata?.role !== "admin") {
    return NextResponse.redirect(new URL("/accessDenied", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
