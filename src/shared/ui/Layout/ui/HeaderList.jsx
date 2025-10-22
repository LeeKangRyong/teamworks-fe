"use client";
import { useState } from "react";
import Image from "next/image";
import user from "@/assets/icons/user.png";
import notification_default from "@/assets/icons/notification-default.png";
import arrow_down from "@/assets/icons/arrow-down.png";
import { useAuth } from "@/entities/auth";
import { LogoutModal } from "@/widgets/Layout";
import { useToast } from "@/shared/ui/Toast";

export function HeaderList() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { logout } = useAuth();
    const { showToast } = useToast();

    const handleUserClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleConfirmLogout = async () => {
        try {
            await logout();
            showToast("로그아웃 되었습니다");
            setIsLogoutModalOpen(false);
        } catch (error) {
            console.error("Logout error:", error);
            showToast("로그아웃에 실패했습니다");
        }
    };

    return (
        <>
            <div className="flex flex-row items-center pr-5">
                <Image 
                    src={notification_default} 
                    alt="notification-default" 
                    className="h-12 w-auto pr-4" 
                />
                <button 
                    onClick={handleUserClick}
                    className="flex flex-row items-center hover:opacity-70 transition-opacity cursor-pointer"
                >
                    <Image src={user} alt="user" className="h-6 w-auto pl-1" />
                    <Image src={arrow_down} alt="arrow-down" className="h-6 w-auto pl-1" />
                </button>
            </div>

            {isLogoutModalOpen && (
                <LogoutModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </>
    );
}