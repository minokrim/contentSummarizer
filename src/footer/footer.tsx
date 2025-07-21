import logo from "../assets/logo.png"
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";

export default function Footer(){
    return <main className="bg-gradient-to-r from-amber-200 to-yellow300-500 flex flex-col md:flex-row justify-between items-center">
        <img src={logo} alt=""  className="w-auto h-[10em]"/>

        <section className="w-[90%] flex font-medium text-sm md:text-lg justify-around items-center gap-5 bg-gray-300/40 h-[5em] p-5 shadow-md shadow-black">
            <p>Kareem Alameen</p>
            <p>Email</p>
            <p>Portfolio</p>
            <p>Github</p>
        </section>

        <section className="flex gap-5 pr-5 md:my-0 my-10">
            <TiSocialFacebook className="text-4xl"/>
            <TiSocialInstagram className="text-4xl"/>
            <TiSocialLinkedin className="text-4xl"/>
            <TiSocialTwitter className="text-4xl"/>
        </section>
    </main>
}