import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Searchbar from "../components/SearchBar";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return ( 
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6">
                <Searchbar />
            </div>
            <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
