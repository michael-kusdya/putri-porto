"use client";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex gap-6">
            <a href="mailto:kurniaputri13@gmail.com" className="text-gray-400 hover:text-white">
              Email
            </a>
            <a href="https://www.linkedin.com/in/krnputri" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/krniaputri" className="text-gray-400 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

