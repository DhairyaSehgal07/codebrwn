import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/useSession";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";

const Authenticated = () => {
  const { data, isLoading, error } = useSession();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading session data</div>;

  return data?.success ? <Link href="/profile">PROFILE</Link> : null;
};

const Auth = () => {
  const auth = Cookies.get("auth_status");

  if (!auth) {
    // If auth_status is not present, show default content
    return <Link href="/auth/sign-in">SIGN IN</Link>;
  }

  return <Authenticated />;
};

export default Auth;
