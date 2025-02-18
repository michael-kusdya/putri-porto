"use client";

import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
  const skills = ["Oil Painting", "Digital Art", "Sculpture", "Mixed Media", "Art Curation", "Color Theory"]

  return (
    <section className="bg-[#121212] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-12 lg:flex-row">
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Jane Doe"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </motion.div>
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold">About Jane Doe</h2>
              <p className="mb-6 text-gray-300">
                Jane Doe is a visionary artist known for her bold and evocative works that challenge conventional
                perspectives. With over a decade of experience in the art world, Jane has developed a unique style that
                blends traditional techniques with contemporary themes.
              </p>
              <p className="mb-8 text-gray-300">
                Her art has been featured in galleries across the globe, from New York to Tokyo, and has earned critical
                acclaim for its ability to provoke thought and emotion. Jane creative process is deeply influenced by
                her travels and her commitment to exploring the human condition in all its complexity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-2xl font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

