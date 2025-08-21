import Image from "next/image";
import success from "@/assets/icons/success-white.png";

export function Toast({ message }) {
    return (
        <div className="absolute right-4 top-20 animate-pulse animate-slideUpAndFade">
            <div className="flex flex-row w-fit gap-1 px-3 py-4 bg-secondary-40 rounded-lg items-center justify-center">
                <Image src={success} alt="success" className="w-4 y-4" />
                <p className="text-gray-0 text-body-s text-center">{message}</p>
            </div>
        </div>
    );
}