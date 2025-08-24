import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import user from "@/assets/icons/user.png";
import notification_default from "@/assets/icons/notification-default.png";
import notification_active from "@/assets/icons/notification-active.png";
import arrow_down from "@/assets/icons/arrow-down.png";
import thumbnail from "@/assets/icons/thumbnail.png"
import google from "@/assets/icons/google.png";

export function Login() {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <header className="absolute w-full h-18 bg-gray-0 top-0 flex items-center px-4 border-b-1 border-gray-10 z-50">
                <div className="w-full max-w-screen-xl flex justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src={logo} alt="logo" className="rounded-sm max-h-6 w-auto" />
                        <p className="text-body-l font-black">TeamWorks</p>
                    </div>
                </div>
            </header>
            
            <div className="flex-1 w-full flex flex-col justify-center items-center gap-8 pt-18">
                <Image src={thumbnail} alt="thumbnail" className="h-30 w-auto" />
                <p className="text-body-l text-gray-70 text-center">공정한 협업, 효율적인 운영</p>
                <Image src={google} alt="google" className="h-10 w-auto"/>
            </div>
        </div>
    );
}