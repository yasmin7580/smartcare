import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const slides = [
    {
        id: 1,
        image: "/banner-1.png",
        title: "Find the Right Doctor for Your Healthcare Journey",
        description:
            "Connect with experienced specialists, schedule appointments easily, and receive trusted healthcare services anytime.",
    },
    {
        id: 2,
        image: "/banner-2.png",
        title: "Quality Healthcare Starts Here",
        description:
            "Search by specialty, location, or availability and discover healthcare professionals who care about your well-being.",
    },
    {
        id: 3,
        image: "/banner-3.png",
        title: "Book Appointments in Minutes",
        description:
            "A faster, smarter way to manage your health with SmartCare's modern appointment platform.",
    },
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);


    const previousSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative h-[80vh] min-h-[550px] w-full overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ${currentSlide === index
                        ? "opacity-100 scale-100"
                        : "pointer-events-none opacity-0 scale-105"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/45"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="mx-auto w-full max-w-7xl px-6">
                            <div className="max-w-2xl text-white">

                                <span className="inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-medium text-red-200 backdrop-blur">
                                    SmartCare Healthcare
                                </span>

                                <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
                                    {slide.title}
                                </h1>

                                <p className="mt-6 text-lg text-gray-200">
                                    {slide.description}
                                </p>

                                <Link
                                    to="/find-doctor"
                                    className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-red-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-2xl"
                                >
                                    Find Doctor

                                    <ArrowRight
                                        size={20}
                                        className="animate-arrow-move transition-transform duration-300 group-hover:translate-x-2"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Previous */}
            <button
                onClick={previousSlide}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white opacity-40 backdrop-blur transition-all duration-300 hover:opacity-100 hover:scale-110"
            >
                <ChevronLeft size={28} />
            </button>

            {/* Next */}
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white opacity-40 backdrop-blur transition-all duration-300 hover:opacity-100 hover:scale-110"
            >
                <ChevronRight size={28} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 ${currentSlide === index
                            ? "h-3 w-10 rounded-full bg-red-600"
                            : "h-3 w-3 rounded-full bg-white/60 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;