'use client';
import { signOut } from "next-auth/react";

const Users = () => {
  return (
    <button onClick={() => signOut()}>
      Sign out
      </button>
  );
};

export default Users;
