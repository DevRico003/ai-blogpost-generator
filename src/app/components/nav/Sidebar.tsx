// Importiere benötigte Module und Bibliotheken
"use client"
import { menu } from "@/../data/menu"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import React from "react"
import { usePathname } from "next/navigation"
import { BiCog, BiHome, BiListUl, BiPlus } from "react-icons/bi"

// Definiere die Sidebar-Komponente
export default function Sidebar() {
  // Hole den aktuellen Benutzer mit dem Hook von auth0
  const { user } = useUser()

  // Bestimme die aktuelle Route mit dem Hook von Next.js
  const currentRoute = usePathname()

  // Eine Hilfsfunktion, die ein Icon basierend auf einem gegebenen String zurückgibt
  function getIcon(icon: string) {
    switch (icon) {
      case "list":
        return <BiListUl />
      case "plus":
        return <BiPlus />
      case "cog":
        return <BiCog />
      default:
        return <BiHome />
    }
  }

  // Wenn ein Benutzer angemeldet ist, wird die Sidebar angezeigt
  return user ? (
    <div className="bg-white border border-gray-100 py-2 flex flex-shrink-0 flex-row justify-around md:justify-start md:flex-col md:h-full md:w-32 z-10">
      {/* Iteriere durch jedes Menüelement und rendere einen Link */}
      {menu.map((item, index) => (
        <Link
          href={item.route}
          key={index}
          className="flex flex-row items-center relative hover:bg-indigo-50 px-4 py-2 cursor-pointer group rounded-lg"
        >
          <div className="flex flex-row items-center">
            {/* Wenn die aktuelle Route mit der Route des Menüelements übereinstimmt, wird ein Indikator gezeigt */}
            {currentRoute === item.route && (
              <div className="absolute hidden md:block h-full w-2 bg-indigo-600 rounded-full -left-1"></div>
            )}
            {currentRoute === item.route && (
              <div className="absolute block md:hidden h-2 w-full bg-indigo-600 rounded-full -top-3 left-0"></div>
            )}
            {/* Zeige das entsprechende Icon für das Menüelement an */}
            <span className="text-gray-500 text-xl group-hover:text-indigo-600">
              {getIcon(item.icon)}
            </span>
            {/* Zeige den Text des Menüelements an */}
            <span className="ml-2 text-gray-500 group-hover:text-indigo-600">
              {item.text}
            </span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    // Wenn kein Benutzer angemeldet ist, wird ein leeres div angezeigt
    <div className="md:mr-32"></div>
  )
}
