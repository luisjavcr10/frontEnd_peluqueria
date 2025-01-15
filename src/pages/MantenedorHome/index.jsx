import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

const MantenedorHome = () => {
    const navigate = useNavigate();

    const slides = [
        {
            id: 1,
            image: '../../../public/img/categorias.jpg',
            title: 'Categorias',
        },
        {
            id: 2,
            image: '../../../public/img/services.jpg',
            title: 'Servicios',
        },
        {
            id: 3,
            image: '../../../public/img/products.jpg',
            title: 'Productos',
        },
        {
            id: 4,
            image: '../../../public/img/roles.jpg',
            title: 'Roles',
        },
        {
            id: 5,
            image: '../../../public/img/employees.jpg',
            title: 'Empleados',
        },
    ];

    const handleNavigateButton = (id) =>{
        switch (id) {
            case 1:
                navigate('/mantenedores/categorias')
                break;
            case 2:
                navigate('/mantenedores/servicios')
                break;
            case 3:
                navigate('/mantenedores/productos')
                break;
            case 4:
                navigate('/mantenedores/roles')
                break;
            case 5:
                navigate('/mantenedores/empleados')
                break;
            default:
                break;
        }
    }

    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='flex flex-col lg:flex-row items-center justify-evenly bg-white w-full h-screen overflow-y-auto'>
            <button
                    onClick={handlePrev}
                    className=' bg-gray-800 text-white p-4 m-4 rounded-full hover:bg-gray-700'
                >
                    &#8592;
            </button>
            {/* Carrusel */}
            <div className='relative w-full lg:w-2/3 max-w-4xl overflow-hidden flex flex-col items-center'>
                <div
                    className='flex transition-transform duration-100 ease-in-out'
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide) => (<Card slide={slide} onClick={() => handleNavigateButton(slide.id)}/>))}
                </div>

                {/* Indicadores */}
                <div className='flex space-x-2 m-4'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
            <button
                    onClick={handleNext}
                    className='bg-gray-800 text-white p-4 m-4 rounded-full hover:bg-gray-700'
                >
                    &#8594;
            </button>
        </div>
    );
};

export default MantenedorHome;
