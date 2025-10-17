export function Box({ num, desc, onClick }) {
    return (
        <div 
            className="bg-secondary-5 rounded-lg flex flex-col justify-center items-center py-6 h-32 cursor-pointer hover:bg-secondary-10 transition-colors duration-200"
            onClick={onClick}
        >
            <h2 className="text-heading-xl text-secondary-70 text-center font-black">{num}</h2>
            <p className="text-body-s text-secondary-70 text-center mt-2 px-2">{desc}</p>
        </div>
    );
}