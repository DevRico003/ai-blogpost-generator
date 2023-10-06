"use client"
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Page() {
  const { user, error, isLoading } = useUser()
  return (
    <main>
      <h1>Hello World</h1>
      {user && <p>The user {user?.name} is logged in.</p>}
      {user ? (
      <a href="api/auth/logout">Logout</a>
      ) : (
      <a href="api/auth/login">Login</a>
      )}
      <div>
        <Link href="/user">Go to /user</Link>
      </div>
    </main>
  )
}
