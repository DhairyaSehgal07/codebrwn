import React from "react";
import { getSession } from "@/app/actions/auth/common";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth/common";

const ProfileScreen = async () => {
  const session = await getSession();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl">PROFILE SCREEN</h1>
        <pre className="mt-8">{JSON.stringify(session)}</pre>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button
            className="rounded-md bg-black px-4 py-2 text-white"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileScreen;
