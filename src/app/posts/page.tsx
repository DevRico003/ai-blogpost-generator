// Hier wird der "client"-Modus festgelegt (wenn es eine spezifische Funktion hat, die nicht im gegebenen Kontext erwähnt wurde).
"use client"

// Importiere benötigte Komponenten und Funktionen.
import Post from "@/components/items/Post"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import { deletePost, getPosts } from "@/../lib/functions"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import { useEffect, useState } from "react"

// Definiere die Hauptseite. withPageAuthRequired stellt sicher, dass nur authentifizierte Benutzer darauf zugreifen können.
export default withPageAuthRequired(function Page() {
  // State für das Laden der Beiträge und die geholten Beiträge.
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [fetchedPosts, setFetchedPosts] = useState<PostWithId[]>([])

  // Nach dem Laden der Komponente Beiträge vom Server holen.
  useEffect(() => {
    async function fetchPosts() {
      await getPosts().then((posts) => {
        setFetchedPosts(posts)
        setLoadingPosts(false)
        console.log(posts)
      })
    }
    fetchPosts()
  }, [])

  // Funktion, um einen Beitrag zu löschen.
  function handleDeletePost(_id: string) {
    async function handler() {
      await deletePost(_id)
    }
    setFetchedPosts((prev) => prev.filter((post) => post._id !== _id))
    handler()
  }

  // Die Haupt-Rückgabekomponente.
  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-[95%] max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-4 text-indigo-600">Your posts</h1>
        <div className="w-full flex flex-col gap-8 mt-4 items-center">
          {/* Zeigt Lade-Skelette, wenn die Beiträge noch geladen werden. */}
          {loadingPosts && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {/* Zeigt eine Nachricht, wenn keine Beiträge gefunden wurden. */}
          {!loadingPosts && fetchedPosts.length === 0 && (
            <h1 className="text-2xl font-bold text-center text-gray-800">
              You have no posts yet!
            </h1>
          )}
          {/* Listet alle geholten Beiträge auf, wenn vorhanden. */}
          {!loadingPosts &&
            fetchedPosts.length > 0 &&
            fetchedPosts.map((post, index) => (
              <Post post={post} key={post._id} handleDeletePost={handleDeletePost}/>
            ))}
        </div>
      </section>
    </section>
  )
})
