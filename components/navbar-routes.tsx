"use client"

import { UserButton } from "@clerk/nextjs"

export const NavbarRoutes = () => {
  return (
    <div className="flex ml-auto gap-x-2">
      <UserButton />
    </div>
  )
}