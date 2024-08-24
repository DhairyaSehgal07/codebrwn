"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/useSession";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";

const Authenticated = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSession();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading session data</div>;

  return (
    <>
      {data?.success ? (
        <>
          <button onClick={() => router.push("/profile")}>PROFILE</button>
        </>
      ) : (
        <>PROFILE</>
      )}
    </>
  );
};

const Auth = () => {
  const router = useRouter();
  const auth = Cookies.get("auth_status");

  if (!auth) {
    return (
      <div>
        <button onClick={() => router.push("/auth/sign-in")}>SIGN IN</button>
      </div>
    );
  }

  return <Authenticated />;
};

export default dynamic(() => Promise.resolve(Auth), { ssr: false });
