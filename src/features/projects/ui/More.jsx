import Image from "next/image"
import more from "@/assets/icons/more.png";

export function More() {
    return (
        <Image src={more} alt="more" className="h-5 w-5" />
    );
}