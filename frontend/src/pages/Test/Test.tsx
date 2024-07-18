import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

const Test = () => {
    // interface CarouselDotsProps {
    //   slides: any[];
    //   activeIndex: number;
    //   goToSlide: (index: number) => void;
    // }
    // const CarouselDots: React.FC<CarouselDotsProps> = ({
    //   slides,
    //   activeIndex,
    //   goToSlide,
    // }) => {
    //   return (
    //     <div className='flex justify-center space-x-2'>
    //       {slides.map((_, idx) => (
    //         <button
    //           key={idx}
    //           className={`h-2 w-2 rounded-full ${
    //             idx === activeIndex ? 'bg-black' : 'bg-gray-300'
    //           }`}
    //           onClick={() => goToSlide(idx)}
    //           aria-label={`Go to slide ${idx + 1}`}
    //         />
    //       ))}
    //     </div>
    //   );
    // };
    const numSlides = 5

    return (
        <Carousel className='w-full max-w-xs ml-16'>
            <CarouselContent>
                {Array.from({ length: numSlides }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className='p-1'>
                            <Card>
                                <CardContent className='flex aspect-square items-center justify-center p-6'>
                                    <span className='text-4xl font-semibold'>
                                        {index + 1}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            {/* <CarouselDots
        slides={Array.from({ length: numSlides })}
        activeIndex={selectedIndex}
        goToSlide={goToSlide}
      /> */}
        </Carousel>
    )
}
export default Test
