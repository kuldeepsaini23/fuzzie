import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes= createRouteMatcher( [
   '/dashboard(.*)',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
]);

const isProtectedRoutes= createRouteMatcher( [
  '/dashboard(.*)',
 '/settings',
 '/workflows(.*)',
 '/connections',
 '/billing',
 '/templates',
 '/logs'
]);


const isIgnoredRoutes= createRouteMatcher( [
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
])
export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoutes(req)) {

    // Add custom logic to run before redirecting

    return auth().redirectToSignIn();
  }

  if (isIgnoredRoutes(req)) return;
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly


