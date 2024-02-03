"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import diemmoLogo from "@/public/diemmo-logo.svg";
import ebookImage from "@/public/ebook.png"
import PopUpForm from "@/app/components/PopUpForm";

const OptInPage = () => {

    const [displayPopupForm, setDisplayPopupForm] = useState(false);
    const [isLeadInfoGiven, setIsLeadInfoGiven] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInput = useRef(null);

    const processBusinessDetails = async () => {
        const businessDetails = userInput.current?.value
        await fetch("/api/leadProblems", {
			method: "POST",
			body: JSON.stringify(businessDetails),
		})
		.then((res) => {
			const leadProblems = res.json();
			return leadProblems;
		})
		.then(async (leadProblems) => {
			console.log(leadProblems)
			setLoading(2)
			await fetch("/api/leadGenIdeas", {
				method: "POST",
				body: JSON.stringify(leadProblems),
			})
			.then((res) => {
				res = res.json()
				return res;
			})
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLeadInfoGiven === false) {
			setDisplayPopupForm(true);
		} else {
            processBusinessDetails()
        }
        
    }

    
	useEffect(() => {
		// const leadInfo = localStorage.getItem('LGAI-LeadInfo');
		const leadInfo = false;
		if (leadInfo) {
			setIsLeadInfoGiven(true);
		}
	}, []);

    return (
        <div className='w-full h-screen flex flex-row justify-center items-center p-6'>
            {displayPopupForm && (
				<PopUpForm
					setIsLeadInfoGiven={setIsLeadInfoGiven}
					isLeadInfoGiven={isLeadInfoGiven}
				/>
			)}
            <div className='w-[1360px] h-auto'>
                <h1 className='text-[#102F54] font-bold text-center text-[48px] mb-3 uppercase'>“I’m Paying Too Much For Leads!!?😠”</h1>
                <h2 className='text-[#102F54] font-semibold text-[20px] leading-9 text-center mb-9'>Want to get more leads for less? Get 40 Exclusive Lead Magnet Ideas to Win Your Ideal Customers!</h2>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] w-full h-full border-2 border-[#102F54] rounded-lg overflow-hidden'>
                    <div style={{ backgroundImage: `url(${ebookImage.src})`}} className='bg-center bg-cover min-h-[400px]'>
                        
                    </div>
                    <div className='h-auto p-10 flex flex-col gap-3'>
                        <h2 className='text-[#102F54] text-sm font-medium'>
                            We are giving away access to a small part of our <strong>Big Business Marketing System</strong> for a limited time only. 
                            <br /><br />
                            <strong>How it works?</strong>
                            <br />
                            Enter a brief description of your business and we will send you a tailor-made list of 40 unique lead magnets to help you attract and close more customers.  
                        </h2>
                        <form
                                onSubmit={handleSubmit}
                                className="flex justify-center items-center flex-col gap-3 w-full"
                                id="genLeadForm"
                            >
                                <textarea
                                    name="businessDetails"
                                    id=""
                                    cols="30"
                                    rows="3"
                                    placeholder="Describe your business here..."
                                    className="border-2 resize-none p-3 rounded-md sm:w-full max-w-2xl w-full text-[#102F54] ring-black/60 ring-offset-2 text-sm"
                                    ref={userInput}
                                    minLength={10}
                                    required
                                ></textarea>
                                <button 
                                    className='bg-[#F46036] w-full p-[12px_24px] rounded-md text-base font-semibold'
                                    type="submit"
				                    id="generateLead"
                                    >
                                        Send Me The Guide 👇
                                    </button>
                            </form>
                        
                        <p className='text-[10px] text-[#0C8BBB]'>* We respect your privacy. Unsubscribe at anytime.</p>
                        <span className="text-[#102F54] mb-[-28px] mt-4 text-center text-[10px] font-black">BUILT BY <Image
                            src={diemmoLogo}
                            alt=""
                            className="fill-[#059C65] text-white inline"
                            width={32}
                        /></span>
                    </div>
                    {/* <div className='bg-red-500 w-full'></div> */}
                </div>
            </div>
        </div>
    )
}

export default OptInPage