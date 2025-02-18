"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselApi, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Add styles
const styles = `
  @media (max-width: 640px) {
    .dialog-content {
      max-width: 90vw;
      margin: 0 auto;
    }
  }

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

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const mobileScreens = [
    {
      src: "https://i.imgur.com/cirrxL2.png",
      alt: "Mobile interface 1",
      title: "Social Feed",
      description: "Engaging social media experience",
      videoId: "dQw4w9WgXcQ",
    },
    {
      src: "https://placehold.co/400x711",
      alt: "Mobile interface 2",
      title: "Dark Mode Dashboard",
      description: "Modern analytics view",
      videoId: "65Vg3_g1kB8",
    },
    {
      src: "https://placehold.co/400x711",
      alt: "Mobile interface 3",
      title: "E-commerce Browse",
      description: "Seamless shopping interface",
      videoId: "dQw4w9WgXcQ",
    },
    {
      src: "https://placehold.co/400x711",
      alt: "Mobile interface 4",
      title: "Profile Settings",
      description: "User-friendly configuration",
      videoId: "dQw4w9WgXcQ",
    },
    {
      src: "https://placehold.co/400x711",
      alt: "Mobile interface 5",
      title: "Media Player",
      description: "Immersive content experience",
      videoId: "dQw4w9WgXcQ",
    },
    {
      src: "https://placehold.co/400x711",
      alt: "Mobile interface 6",
      title: "Chat Interface",
      description: "Modern messaging design",
      videoId: "dQw4w9WgXcQ",
    },
  ];

  const handleItemClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setVideoOpen(true);
  };

  return (
    <section className="relative bg-black py-20">
      <style jsx>{styles}</style>
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Works
        </motion.h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {mobileScreens.map((screen, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    className="p-1"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className="overflow-hidden bg-zinc-800 rounded-xl cursor-pointer"
                      onClick={() => handleItemClick(screen.videoId)}
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[9/16] overflow-hidden rounded-lg group">
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent rounded-t-lg h-8" />
                          <img
                            src={screen.src}
                            alt={screen.alt}
                            className="object-cover transition-all duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                            <h3 className="text-lg font-semibold text-white mb-1">{screen.title}</h3>
                            <p className="text-sm text-zinc-300">{screen.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="text-black bg-white border border-black hover:bg-gray-200 absolute -left-12" />
              <CarouselNext className="text-black bg-white border border-black hover:bg-gray-200 absolute -right-12" />
            </div>

            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {mobileScreens.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="dialog-content sm:max-w-[80vw] md:max-w-[400px] p-0 bg-black">
          <DialogHeader className="p-4">
            <DialogTitle className="text-white">
              {mobileScreens.find((screen) => screen.videoId === selectedVideo)?.title}
            </DialogTitle>
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