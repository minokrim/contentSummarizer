import logo from "../assets/logo.png"
export default function Nav(){
    return <main className="w-[100%] bg-gradient-to-t from-amber-200 to-yellow-300 flex justify-between items-center">
        <img src={logo} alt="" className="w-auto h-[7em]"/>
        <h3 className="font-extrabold text-2xl pr-5 text-gray-800">Easily summarize your contents</h3>
    </main>
}