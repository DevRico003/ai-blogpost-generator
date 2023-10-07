"use client"

// Importiert benötigte Funktionen, Zustände (Atoms) und Komponenten.
import { refetchCreditsAtom } from "@/../atoms/flagAtom"
import { profileAtom } from "@/../atoms/profileAtom"
import { getProfile } from "@/../lib/functions"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"
import { BiCoin, BiLogOut, BiPen } from "react-icons/bi"
import { useRecoilState, useRecoilValue } from "recoil"

export default function Navbar() {
  // Holt den aktuellen Benutzer mit dem Auth0 Hook.
  const { user } = useUser()

  // Verwaltet den Profilzustand mithilfe von Recoil.
  const [profile, setProfile] = useRecoilState(profileAtom)

  // Überwacht, ob Credits neu abgerufen werden müssen.
  const refetchCredits = useRecoilValue(refetchCreditsAtom)

  // Nach dem Laden des Navbars wird das Profil des Benutzers abgerufen, falls er angemeldet ist.
  useEffect(() => {
    async function fetchProfile() {
      const profile = await getProfile()
      setProfile(profile)
    }      
    if(user) fetchProfile()
  },[setProfile, user, refetchCredits])

  // Die Haupt-Rückgabekomponente (das Navbar-Element).
  return (
    <nav className="w-full bg-white shadow-md px-6 py-2 z-20 grid grid-cols-3">
      {/* Wenn der Benutzer angemeldet ist, zeigt seine Credits und einen Link zum Kauf weiterer Credits. */}
      {user ? (        
        <div className="flex justify-start">
          <div className="flex flex-col md:flex-row justify-start items-center md:gap-4">
            <div className="flex items-center gap-1">
              <BiCoin /> <span className="hidden md:block">Credits:</span> {profile.credits}
            </div>
            <Link
              href="/profile"
              className="text-xs md:text-sm font-bold text-gray-600 hover:text-indigo-600"
            >
              BUY MORE
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Hauptlink zur Startseite. */}
      <Link
        href="/"
        className="flex flex-row justify-center font-medium text-xl items-center gap-1"
      >
        <BiPen /> Bloggify
      </Link>
      {/* Wenn der Benutzer angemeldet ist, zeigt ein Bild des Benutzers, begrüßt ihn und bietet eine Logout-Option. */}
      {user ? (
        <div className="flex flex-row justify-end items-center gap-2">
          <Image
            className="rounded-full"
            src={user?.picture || ""}
            alt={user?.name || ""}
            width={24}
            height={24}
          />
          <span className="font-semibold text-gray-600 md:hidden">Hi!</span>
          <span className="hidden md:block font-semibold text-gray-600">Hi, {user?.name}!</span>
          <a
            href="/api/auth/logout"
            className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
          >
            <BiLogOut />
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  )
}
