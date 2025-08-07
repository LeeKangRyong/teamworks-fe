import Image from "next/image";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";

export const DashBoard = () => {
    return (
        <div className="bg-secondary-20 flex justify-center w-full h-screen">
            <Header />
            <Footer />
        </div>
    );
};