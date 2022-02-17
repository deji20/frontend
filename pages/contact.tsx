import { NextPage } from 'next'
import Head from 'next/head'
import Api from "../api"

const Contact: NextPage = () => {
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const obj: any = {};
        let data = new FormData(e.target as HTMLFormElement);
        data.forEach((val, key) => {
            obj[key] = val
        });
        try{
            Api.post("/ticket", obj);
        }catch(err){
            console.log(err);
        }
    }
    return (
    <div className="flex justify-center bg-gray-900 min-h-screen">
        <Head>
            <title>Contact</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="w-1/2 max-w-screen-sm m-20 h-min relative bg-gray-700 rounded-lg drop-shadow-2xl hover:drop-shadow-none">
            <form method='POST' onSubmit={submit} className="flex flex-col flex-grow h-full justify-between">
                <div className='flex flex-col m-4 p-4 rounded shadow-2xl bg-white bg-opacity-10'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col flex-shrink text-white mr-1'>
                            <label>Type:</label>
                            <select name="type" className='mb-3 border border-gray-700 rounded p-1 px-2 bg-gray-500 focus:bg-gray-400'>
                                <option value={"Complaint"}>Complaint</option>
                            </select>
                        </div>
                        <div className='flex flex-col flex-grow text-white w-full'>
                            <label>Name:</label>
                            <input name="name" type="text" className='mb-3 border border-gray-700 rounded p-1 px-2 bg-gray-500 focus:bg-gray-400'/>
                        </div>
                    </div>
                    <div className='flex flex-col text-white'>
                        <label>Email:</label>
                        <input name="email" className='mb-3 border border-gray-700 rounded p-1 px-2 bg-gray-500 focus:bg-gray-400' type="text"/>
                    </div>
                </div>
                <div className='flex flex-col text-white m-4 p-4 rounded shadow-2xl bg-white bg-opacity-10'>
                    <label className='text-white'>Subject:</label>
                    <input name="subject" className='mb-3 border border-gray-700 rounded p-1 px-2 bg-gray-500 focus:bg-gray-400' type="text"/>
                    <textarea name="message" className='border min-h-[30vh] flex-grow border-gray-700 rounded p-1 px-2 bg-gray-500 focus:bg-gray-400'/>
                </div>

                <div className='place-self-end text-white'>
                    <button>
                        <input className='p-2 px-10 bg-gray-900 rounded-tl-2xl rounded-br-lg cursor-pointer hover:bg-gray-800' type="submit" value="Send"/>
                    </button>
                </div>
            </form>
        </div>
    </div>)
  }
  export default Contact