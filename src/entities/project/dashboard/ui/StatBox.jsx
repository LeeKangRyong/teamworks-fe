export function StatBox({ value, label }) {
    return (
        <div className="bg-secondary-5 rounded-lg flex flex-col justify-center items-center py-6 lg:flex-[1] min-w-0">
            <h2 className="text-heading-xl text-secondary-70 font-black">{value}</h2>
            <p className="text-body-s text-secondary-70 mt-2">{label}</p>
        </div>
    );
}