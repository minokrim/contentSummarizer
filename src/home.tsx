import Body from "./body/body";
import Nav from "./nav/nav";
import History from "./history/histtory";
import Footer from "./footer/footer";
export default function Home(){
    return <main className="bg-white w-full flex flex-col">
        <Nav/>
        <Body/>
        <History/>
        <Footer/>
    </main>
}