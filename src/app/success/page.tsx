"use client"
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

export default withPageAuthRequired(
function Page() {
  return (
    <main>
      <h1>Hello World</h1>
      <p>This is the user page.</p>
      <div>
        <Link href="/">Go to home</Link>
      </div>
    </main>
  )
})
