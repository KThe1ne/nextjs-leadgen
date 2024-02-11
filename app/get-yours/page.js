"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import diemmoLogo from "@/public/diemmo-logo.svg";
import ebookImage from "@/public/ebook.png"
import PopUpForm from "@/app/components/PopUpForm";

const OptInPage = () => {

    const [displayPopupForm, setDisplayPopupForm] = useState(false);
    const [isLeadInfoGiven, setIsLeadInfoGiven] = useState(false);
    const [leadDetails, setLeadDetails] = useState({})
    const [loading, setLoading] = useState(false);
    const userInput = useRef(null);
    let userId;

    const details = 
{
    "software": [
        "Bathroom renovation cost calculator tool to estimate expenses based on design and materials",
        "Interactive bathroom design planner to visualize different layout and fixture options",
        "Project timeline and budget tracking spreadsheet to keep track of expenses and progress",
        "Virtual reality tour of different bathroom designs and layouts for inspiration",
        "Online directory of reputable suppliers for materials and fixtures",
        "Interactive checklist for evaluating contractor qualifications and services offered",
        "3D bathroom layout visualization tool to help homeowners plan their ideal renovation",
        "Budget-friendly fixture and material comparison tool to find the best deals",
        "Interactive quiz to help homeowners identify their design style preferences",
        "Customizable renovation planning dashboard to organize ideas, quotes, and schedules"
    ],
    "information": [
        "Comprehensive guide to hiring a trustworthy and skilled contractor",
        "Live webinar on navigating the renovation process and avoiding common pitfalls",
        "Ebook on designing a functional and stylish bathroom within budget",
        "DIY renovation hacks and tips for homeowners on a tight budget",
        "Presentation on understanding different types of bathroom fixtures and their pros and cons",
        "Step-by-step video course on planning and executing a successful bathroom renovation",
        "Infographic on the top design trends and materials for modern bathrooms",
        "Free consultation with a professional designer to discuss renovation ideas and options",
        "Expert panel discussion on overcoming renovation challenges and setbacks",
        "Interactive workshop on creating a realistic budget for a bathroom renovation"
    ],
    "services": [
        "Free in-home consultation to assess the current bathroom and discuss renovation options",
        "Sample renovation plan and design proposal customized to the homeowner's preferences",
        "Virtual reality tour of completed bathroom renovation projects for inspiration",
        "Complimentary material and fixture sourcing service to find the best deals",
        "Trial project management service to oversee a small renovation project from start to finish",
        "Free contractor matchmaking service to connect homeowners with reputable professionals",
        "Limited-time discount offer on renovation services for early inquiries",
        "Free virtual consultation with a renovation expert to address specific concerns and questions",
        "Trial access to a project tracking and communication platform for seamless renovation coordination",
        "Complimentary project timeline and budget assessment to identify potential cost savings"
    ],
    "physical products": [
        "Customized bathroom renovation planning guide and checklist",
        "Free sample box of tile and fixture options for the renovation",
        "Post-renovation care package with maintenance tips and recommended products",
        "Informative brochure on the most durable and stylish materials for bathroom renovations",
        "Limited edition design inspiration booklet featuring completed renovation projects",
        "Complimentary renovation planning workbook for homeowners to organize their ideas",
        "Exclusive discount voucher for materials and fixtures from partner suppliers",
        "Free blueprint of a functional bathroom layout for reference",
        "Trial pack of eco-friendly and cost-effective renovation materials",
        "Informative poster on common renovation challenges and how to address them"
    ]
    }

    const processBusinessDetails = async (leadName) => {
        console.log(leadName)
        const formattedLeadName = leadName.replace(/\s/g,"_").toLowerCase();
        // const businessDetails = userInput.current?.value
        // await fetch("/api/leadProblems", {
		// 	method: "POST",
		// 	body: JSON.stringify(businessDetails),
		// })
		// .then((res) => {
		// 	const leadProblems = res.json();
		// 	return leadProblems;
		// })
		// .then(async (leadProblems) => {
		// 	console.log(leadProblems)
		// 	setLoading(2)
		// 	await fetch("/api/leadGenIdeas", {
		// 		method: "POST",
		// 		body: JSON.stringify(leadProblems),
		// 	})
		// 	.then((res) => {
		// 		res = res.json()
		// 	})
        //     .then(async (res) => {
        //         await fetch("/api/send-pdf", {
        //             method: "POST", 
                    // body: {
                    //      "magnetIdeas": res,
                    //     "userId": userId
                    // }
        //         })
        //     })
        // })
        // fetch("/api/send-pdf/upload-pdf", {
        //     method: "POST",
        //     body: {
        //         "userId": leadDetails["userId"]
        //     }
        // })
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error('File not Uploaded');
        //     }
        //     else {
        //         fetch("/api/send-pdf/send-email", {
        //             method: "POST",
        //             body: {
        //                 "userId": leadDetails["userId"],
        //                 "userEmail": leadDetails["emails"]
        //             }
        //         })
        //     }
        // })
        try{
            fetch("api/send-pdf/create-pdf", {
            method: "POST",
            body: JSON.stringify({
                "username": formattedLeadName,
                "magnetIdeas": details
            })
            })
            .then(async (res) => {
                res = await res.json()
                return res
            })
            .then((res) => {
                // console.log(res)
                if (res?.pdfPath) {
                    fetch("api/send-pdf/upload-pdf", {
                        method: "POST",
                        body: JSON.stringify({
                            "username": formattedLeadName,
                            "pdfPath": res["pdfPath"],
                        })
                    })
                    .then(async (res) => {
                        res = await res.json()
                        return res
                    })
                    .then((res) => {
                        console.log(res)
                        // console.log("RES had issue")
                    })
                    .then(() => {
                        fetch("/api/send-pdf/send-email", {
                            method: "POST",
                            body: JSON.stringify({
                                "username": formattedLeadName,
                                "userEmail": leadDetails["emails"],
                                "userId": leadDetails["userId"]
                            })
                        })
                    })
                    .then(() => console.log("Success"))
                }
            })
            /* */
        }
        catch (err) {
            // console.log(err)
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLeadInfoGiven === false) {
			setDisplayPopupForm(true);
		} else {
            console.log(leadDetails)
            processBusinessDetails(leadDetails["name"])
        }
        
    }

    useEffect(() => {
        console.log(leadDetails)
        if (Object.keys(leadDetails) > 0) {
            processBusinessDetails(leadDetails["name"])
        }
    }, [leadDetails])
    
	useEffect(() => {
        console.log("Test")
		const leadInfo = JSON.parse(localStorage.getItem('LGAI-LeadInfo'));
        console.log(leadInfo)
		// const leadInfo = false;
		if (leadInfo) {
            console.log(leadInfo)
			setIsLeadInfoGiven(true);
            setLeadDetails(leadInfo);
		}
	}, []);

    return (
        <div className='w-full h-screen flex flex-row justify-center items-center p-6'>
            {displayPopupForm && (
				<PopUpForm
					setIsLeadInfoGiven={setIsLeadInfoGiven}
					isLeadInfoGiven={isLeadInfoGiven}
                    setLeadDetails={setLeadDetails}
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