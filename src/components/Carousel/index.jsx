import Card from '../Card';

const Carousel = ({ slides, currentSlide, onClickCard,onClickItem }) => {
    return(
        <div className='relative w-full lg:w-2/3 max-w-4xl overflow-hidden flex flex-col items-center'>
            <div
                className='flex transition-transform duration-300 ease-in-out'
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {slides.map((slide) => (<Card slide={slide} onClick={()=>onClickCard(slide.path)}/>))}
            </div>
            {/* Indicadores */}
            <div className='flex space-x-2 m-4'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
                        }`}
                        onClick={()=>onClickItem(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
