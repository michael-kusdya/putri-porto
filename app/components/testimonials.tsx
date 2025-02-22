"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Rachel Karina",
    role: "Co-Founder of Maen Yo! & Startive",
    content: "I had the opportunity to work with Putri during her time at Startive/Maen Yo! and she was an absolute joy to have on the team! I can confidently say that without her, the company would not be where it was today. Not only was she self-sufficient but she was quick to adapt to any task thrown at her, which was important as we were working in a startup environment. Putri also had initiative and drive and often made changes without me having to ask, which makes her a wonderful addition to any future team she finds herself on.",
    avatar: "/photo/rachel.jpeg",
  },
  {
    name: "Sekar Khairunnisa Arum Meidinasari",
    role: "Game Illustrator at Maen Yo! & Startive",
    content: "I had the pleasure of collaborating closely with Putri, primarily concentrating on game assets and animated illustrations. While I was responsible for the visual asset creation, Putri was the one who truly brought them to life with her expertise in animation. One thing that continues to amaze me about Putri is her remarkable organization skills.",
    avatar: "/photo/sekar.jpeg",
  },
  {
    name: "Raihansyah Dipananda",
    role: "Social Media Marketing Specialist at Maen Yo! & Startive",
    content: "I had the pleasure of working with Putri at Maen Yo!, where she served as a Motion Graphic Designer. During her time with us, Putri demonstrated remarkable growth in her skillset, particularly in motion graphics and video editing. It was truly impressive to witness her rapid development and the increasing sophistication of her work.",
    avatar: "/photo/masre.jpeg",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="bg-[#121212] py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          What People Say
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-[#121212]">
                <CardContent className="p-6">
                <p className="mb-4 text-gray-300" style={{ whiteSpace: "pre-line" }}>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

