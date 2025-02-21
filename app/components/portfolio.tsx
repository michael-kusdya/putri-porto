"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { X } from "lucide-react"; // Import the X icon
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Style for the dots
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
`;

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const categories = ["all", "BRI", "Nippon", "MaenYo!", "Courtside"];

  const works = [
    { id: 1, title: "Social Feed App", category: "mobile", image: "https://i.imgur.com/cirrxL2.png", year: "2024", videoId: "pSFSTonEYqM" },
    { id: 2, title: "E-commerce Platform", category: "web", image: "https://placehold.co/400x711", year: "2023", videoId: "65Vg3_g1kB8" },
    { id: 3, title: "Productivity Dashboard", category: "desktop", image: "https://placehold.co/400x711", year: "2024", videoId: "dQw4w9WgXcQ" },
    { id: 4, title: "Fitness Tracker", category: "mobile", image: "https://placehold.co/400x711", year: "2023", videoId: "dQw4w9WgXcQ" },
  ];

  const filteredWorks = works.filter((work) => (selectedCategory === "all" ? true : work.category === selectedCategory));

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      console.log(currentSlide);
      
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentSlide(0);
    carouselApi.scrollTo(0);
  }, [selectedCategory, carouselApi]);

  const handleItemClick = (videoId: string, title: string) => {
    setSelectedVideo(videoId);
    setSelectedTitle(title);
    setVideoOpen(true);
  };

  return (
    <section className="bg-black">
      <style jsx>{styles}</style>
      <div className="container mx-auto px-4 pb-20">
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm capitalize font-semibold ${
                selectedCategory !== category ? "text-black border-white hover:bg-black hover:text-white" : ""
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
                    <Card className="overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => handleItemClick(work.videoId, work.title)}>
                      <CardContent className="p-0">
                        <div className="group relative">
                          <div className="aspect-[9/16] overflow-hidden">
                            <img
                              src={work.image}
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
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="dialog-content sm:max-w-[80vw] md:max-w-[400px] p-0 bg-black">
          <DialogClose className="absolute right-4 top-4 rounded-full p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all border border-white">
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className="p-4">
            <DialogTitle className="text-white">{selectedTitle}</DialogTitle>
          </DialogHeader>
          <div className="relative pb-[177.78%] h-0 mb-12">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
