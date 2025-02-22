"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselApi, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
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
    { id: 1, title: "BRI Fitur Impian", category: "BRI", image: "/cover/bri/bri_fitur_impian.png", year: "2024", videoId: "MOJ_QiAQn24" },
    { id: 2, title: "BRI Merchant Self Onboarding", category: "BRI", image: "/cover/bri/bri_merchant_self_onboarding.png", year: "2023", videoId: "65Vg3_g1kB8" },
    { id: 3, title: "BRI Omni Valentine", category: "BRI", image: "/cover/bri/cover_bri_valentine.png", year: "2024", videoId: "UrvWiigsnfo" },
    { id: 4, title: "BRIZZI Topup", category: "BRI", image: "/cover/bri/brizzi_topup.png", year: "2023", videoId: "edB1W9g0nKE" },
    { id: 5, title: "BRI Omni Chinese New Year", category: "BRI", image: "/cover/bri/bri_cny.png", year: "2023", videoId: "3_Pt08TP2pg" },
    { id: 6, title: "BRI Merchant Liberte", category: "BRI", image: "/cover/bri/cover_bri_liberte.png", year: "2023", videoId: "jjXAhDav2CY" },
    { id: 7, title: "Nippon Paint Find Freedom", category: "Nippon", image: "/cover/nippon/nippon_freedom.png", year: "2024", videoId: "lOgxWlaTiOg" },
    { id: 8, title: "Nippon Paint Find Balance", category: "Nippon", image: "/cover/nippon/nippon_balance.png", year: "2024", videoId: "0k3YLuKu_Ns" },
    { id: 9, title: "Nippon Paint New Year", category: "Nippon", image: "/cover/nippon/nippon_newyear.png", year: "2024", videoId: "nerJHYCqVnk" },
    { id: 10, title: "Nippon Paint 2024 Wrapped", category: "Nippon", image: "/cover/nippon/nippon_wrapped.png", year: "2024", videoId: "emyEHYzyCLY" },
    { id: 11, title: "Nippon Paint Elastex Fiberflex PU", category: "Nippon", image: "/cover/nippon/nippon_elastex.png", year: "2024", videoId: "qpS9mwGhGz4" },
    { id: 12, title: "Nippon Paint Financial Report", category: "Nippon", image: "/cover/nippon/nippon_finance.png", year: "2024", videoId: "hHGiC_HjU8o" },
    { id: 13, title: "Ads Maen Combo", category: "MaenYo!", image: "/cover/maenyo/maenyo_combo.png", year: "2024", videoId: "UR1FJ5tN7Kk" },
    { id: 14, title: "Ads Maen Cepe", category: "MaenYo!", image: "/cover/maenyo/maenyo_cepe.png", year: "2024", videoId: "XLDwABhKXos" },
    { id: 15, title: "Maen Yo Revamp", category: "MaenYo!", image: "/cover/maenyo/maenyo_revamp.png", year: "2024", videoId: "zvdeP7Hh0Kg" },
    { id: 16, title: "Courtside Racket Type", category: "Courtside", image: "/cover/courtside/courtside_racket_type.png", year: "2024", videoId: "fFGjAR4PDBU" },
    { id: 17, title: "Courtside Favourite Athlete", category: "Courtside", image: "/cover/courtside/courtside_favourite_athlete.png", year: "2024", videoId: "ZIGQ3zuC90k" },
    { id: 18, title: "How to Book on Courtside", category: "Courtside", image: "/cover/courtside/courtside_how_to_book.png", year: "2024", videoId: "to0dcw1IFdI" },
    { id: 19, title: "Courtside Travel", category: "Courtside", image: "/cover/courtside/courtside_travel.png", year: "2024", videoId: "OdKr22UcZd8" },
    { id: 20, title: "Courtside Fit Check", category: "Courtside", image: "/cover/courtside/courtside_fit_check.png", year: "2024", videoId: "vxu3UgEj5-E" }
]


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
            className={`text-sm capitalize font-semibold border ${
              selectedCategory === category
                ? "border-white bg-black text-white" // Saat aktif
                : "text-black border-white hover:bg-black hover:text-white"
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
                            {/* <p className="text-sm text-zinc-300">{work.year}</p> */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="text-black bg-white border border-black hover:bg-gray-200 absolute -left-12" />
                <CarouselNext className="text-black bg-white border border-black hover:bg-gray-200 absolute -right-12" />
              </div>

              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {works.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="dialog-content sm:max-w-[80vw] md:max-w-[400px] p-0 bg-black">
          <DialogClose className="absolute right-4 top-4 rounded-full p-1 opacity-70 hover:opacity-100 transition-all border border-white">
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
