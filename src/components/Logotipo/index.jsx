//p-4 m-6 text-center text-xl font-kanit font-kanit-bold border-b border-x-zinc-400
const Logotipo = () =>{
    return (
        <div className='flex flex-col justify-center items-center p-4 m-4 border-b border-x-zinc-400 gap-4'>
            <img 
                className='rounded-full w-48 h-48 lg:w-3/4 lg:h-3/4 object-cover shadow-md shadow-rose-100' 
                src='./../../../public/img/logotipoPNG.png' 
                alt='Logotipo' 
            />
            <h1 className='text-xl font-kanit font-kanit-bold'>Damari's Salón</h1> 
        </div>
    );
}

export default Logotipo; 