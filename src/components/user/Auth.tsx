import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/useSession";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import { useSessionContext } from "@/context/SessionContext";

const Authenticated = () => {
  const { data, isLoading, error } = useSession();
  const { setSessionData } = useSessionContext();

  useEffect(() => {
    if (data?.success) {
      // Update the session context with the session data
      setSessionData(data.session); // Assuming `data.session` holds the session information
    }
  }, [data, setSessionData]);

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

// Dynamically import the Auth component with SSR disabled
export default dynamic(() => Promise.resolve(Auth), { ssr: false });
