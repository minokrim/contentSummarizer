import { MdOutlineTextFields } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

export default function Body(){
    return <main className="p-5">
        <div>
        <section className="flex gap-5 items-center pl-5 pb-5">
            <button className="bg-green-200 p-8 rounded-2xl font-bold">
                <MdOutlineTextFields/>
                Text
            </button>
            <button className="bg-red-200 p-8 rounded-2xl font-bold">
                <FaLink/>
                URL
            </button>
            <button className="bg-blue-200 p-8 rounded-2xl font-bold">
                <FaFilePdf/>
                Docs
            </button>
        </section>
        </div>

        <section className="flex justify-around">
            <textarea placeholder="Paste your text here..." draggable="false" className="resize-none -webkit-user-drag-none border-solid border-1 border-amber-200 w-[40%] h-[25em] bg-white"></textarea>
            <div data-placeholder="AI Summary" className="w-[40%] bg-amber-50 shadow-black shadow-sm"></div>
        </section>
    </main>
}