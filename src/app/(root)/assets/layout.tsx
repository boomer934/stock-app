import Header from "@/components/customized/Header";
import Footer from "@/components/customized/Footer";

export default function AssetsLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer/>
        </div>
    )
}