import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import user from "@/assets/icons/user.png";
import notification_default from "@/assets/icons/notification-default.png";
import notification_active from "@/assets/icons/notification-active.png";
import arrow_down from "@/assets/icons/arrow-down.png";
import { HeaderList } from "@/features/layout";

export function LayoutHeader() {
    return (
        <header className="absolute w-full h-14 bg-gray-0 top-0 flex justify-between items-center px-4 border-b-1 border-gray-10 z-50">
            <div className="flex flex-row gap-2 items-center">
                <Image src={logo} alt="logo" className="rounded-sm max-h-6 w-auto" />
                <p className="text-body-l font-black">TeamWorks</p>
            </div>
            <HeaderList />
        </header>
    );
}