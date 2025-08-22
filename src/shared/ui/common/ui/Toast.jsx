import Image from "next/image";
import success from "@/assets/icons/success-white.png";

export function Toast({ message }) {
    return (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 animate-pulse animate-slideUpAndFade">
            <div className="fixed inset-0 bg-white rounded-lg"></div> {/* Toast 뒤 안보이게 하기 (bg-toast에 opacity-80 적용됨 issuse) */}
            <div className="flex flex-row w-fit gap-1 px-3 py-4 bg-toast rounded-lg items-center justify-center relative z-10">
                <Image src={success} alt="success" className="w-4 y-4" />
                <p className="text-gray-0 text-body-s text-center">{message}</p>
            </div>
        </div>
    );
}