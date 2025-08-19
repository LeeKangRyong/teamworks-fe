export function Box({ num, desc }) {
    return (
        <div className="bg-secondary-5 rounded-lg flex flex-col justify-center items-center px-8 py-15 h-32 flex-1 min-w-[200px]">
            <h2 className="text-heading-xl text-secondary-70 text-center p-2 font-black">{num}</h2>
            <p className="text-body-s text-secondary-70 text-center p-2 leading-relaxed">{desc}</p>
        </div>
    );
}