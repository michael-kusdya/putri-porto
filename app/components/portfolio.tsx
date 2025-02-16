"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const styles = `
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgb(82 82 91);
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .dot:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  .dot.active {
    background-color: white;
    opacity: 1;
    transform: scale(1.2);
  }
`

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselApi, setCarouselApi] = useState(null)

  const categories = ["all", "mobile", "web", "desktop"]

  const works = [
    {
      id: 1,
      title: "Social Feed App",
      category: "mobile",
      image: "https://i.imgur.com/cirrxL2.png",
      year: "2024",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "web",
      image: "https://placehold.co/400x711",
      year: "2023",
    },
    {
      id: 3,
      title: "Productivity Dashboard",
      category: "desktop",
      image: "https://placehold.co/400x711",
      year: "2024",
    },
    {
      id: 4,
      title: "Fitness Tracker",
      category: "mobile",
      image: "https://placehold.co/400x711",
      year: "2023",
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "web",
      image: "https://placehold.co/400x711",
      year: "2024",
    },
    {
      id: 6,
      title: "Video Editing Suite",
      category: "desktop",
      image: "https://placehold.co/400x711",
      year: "2023",
    },
  ]

  const filteredWorks = works.filter((work) => (selectedCategory === "all" ? true : work.category === selectedCategory))

  // Update current slide when carousel changes
  useEffect(() => {
    if (!carouselApi) return

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  // Reset current slide when category changes
  useEffect(() => {
    setCurrentSlide(0)
    carouselApi?.scrollTo(0)
  }, [selectedCategory, carouselApi])

  return (
    <section className="bg-black py-20">
      <style jsx>{styles}</style>
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl">Portfolio</h2>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm capitalize ${
                selectedCategory !== category ? "text-white border-white hover:bg-white hover:text-black" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
              setApi={setCarouselApi}
            >
              <CarouselContent>
                {filteredWorks.map((work) => (
                  <CarouselItem key={work.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden bg-zinc-900">
                      <CardContent className="p-0">
                        <div className="group relative">
                          <div className="aspect-[9/16] overflow-hidden">
                            <img
                              src={work.image || "/placeholder.svg"}
                              alt={work.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                            <h3 className="text-lg font-semibold text-white">{work.title}</h3>
                            <p className="text-sm text-zinc-300">{work.year}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex text-white bg-black border border-white hover:bg-zinc-800" />
              <CarouselNext className="hidden md:flex text-white bg-black border border-white hover:bg-zinc-800" />

              {/* Mobile Dot Navigation */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {filteredWorks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      carouselApi?.scrollTo(index)
                    }}
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

