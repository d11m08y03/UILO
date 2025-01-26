import * as React from "react";
import photo1 from "../assets/images/gallery/a1.jpg";
import photo2 from "../assets/images/gallery/f1.jpg";
import photo3 from "../assets/images/gallery/f2.jpg";
import photo4 from "../assets/images/gallery/f3.jpg";
import photo5 from "../assets/images/gallery/f4.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function GalleryCarousel() {

  const photos = [photo1, photo2, photo3, photo4, photo5];

  return (
    <div className="flex justify-center items-center min-h-screen lg:ml-32">
      <Carousel className="w-full max-w-xl">
        <CarouselContent className="-ml-1">
          {photos.map((photo, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <img
                      src={photo} 
                      alt={`Slide ${index + 1}`}
                      className="object-cover w-50 h-50 rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
