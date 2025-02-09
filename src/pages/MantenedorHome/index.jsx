import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slidesData from '../../utils/data/slidesData';
import CarouselButton from '../../components/buttons/CarouselButton';
import Carousel from '../../components/Carousel';

import { GrPrevious,GrNext } from "react-icons/gr";

const MantenedorHome = () => {
    const navigate = useNavigate();

    const handleNavigateButton = (path) =>{
        navigate(path);
    }

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleCurrentSlide = (index) =>{
        setCurrentSlide(index)
    }

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='flex flex-col lg:flex-row items-center justify-evenly bg-white w-full h-screen overflow-y-auto'>
            <CarouselButton onClick={handlePrev}>
                   <GrPrevious/>
            </CarouselButton>
            {/* Carrusel */}
            {<Carousel slides={slidesData} currentSlide={currentSlide} onClickCard={handleNavigateButton} onClickItem={handleCurrentSlide}/>}

            <CarouselButton onClick={handleNext}>
                   <GrNext/>
            </CarouselButton>
        </div>
    );
};

export default MantenedorHome;
