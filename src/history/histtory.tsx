import React from "react";
export default function History(){
    return <main className="w-full p-10 bg-amber-50">
        <h2 className="font-semibold text-2xl">SUMMARIES</h2>
        <table className="w-full border-solid border-amber-100 border-3">
            <tr className="flex justify-around">
                <th>Summary</th>
                <th>Date</th>
                <th>Link</th>
                <th></th>
                <th></th>
            </tr>
        </table>
    </main>
}