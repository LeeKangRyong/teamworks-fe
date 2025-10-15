import Image from "next/image";
import user from "@/assets/icons/user.png";
import notification_default from "@/assets/icons/notification-default.png";
import notification_active from "@/assets/icons/notification-active.png";
import arrow_down from "@/assets/icons/arrow-down.png";

export function HeaderList() {
    return (
        <div className="flex flex-row items-center pr-5">
            <Image src={notification_default} alt="notification-default" className="h-12 w-auto pr-4" />
            <Image src={user} alt="user" className="h-6 w-auto pl-1" />
            <Image src={arrow_down} alt="arrow-down" className="h-6 w-auto pl-1" />
        </div>
    );
}