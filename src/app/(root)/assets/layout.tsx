import Header from "@/components/customized/Header";
import Footer from "@/components/customized/Footer";

export default function AssetsLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}