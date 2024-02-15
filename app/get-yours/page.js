"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    let userId;

    const formatResponse = (res) => {
		res = res.leadMagnetIdeas;

		try {
			return JSON.parse(res);
		} catch (error) {
			// console.log(res)
			res = `${res}`;
			const regex = /{[\s\S]*?}/;
			// console.log(res)
			const matches = res.match(regex);
			// console.log(matches)
			if (matches && matches.length > 0) {
				try {
					const dict = JSON.parse(matches[0]);
					return dict;
				} catch (e) {
					console.error("Error parsing dictionary:", e);
				}
			}

			return null;
		}
	};

    /* const processBusinessDetails = async (leadDetails) => {

        const businessDetails = userInput.current?.value

        const formattedLeadName = leadDetails["name"].replace(/\s/g, "_").toLowerCase();
        try {
            const leadProblemsResponse = await fetch("/api/leadProblems", {
                method: "POST",
                body: JSON.stringify(businessDetails),
            })
            console.log("Audience Problems Generated ", leadProblemsResponse.ok)

            if (!leadProblemsResponse.ok) {
                throw new Error("Failed to generate lead problems");
            }

            const leadProblems = await leadProblemsResponse.json()

            console.log(leadProblems)

            const leadMagnetIdeasResponse = await fetch("/api/leadGenIdeas", {
                method: "POST",
                body: JSON.stringify(leadProblems),
            })

            if (!leadMagnetIdeasResponse.ok) {
                throw new Error("Failed to generate lead magnet ideas");
            }
            console.log("Lead Magnet Ideas Generated")

            let leadMagnetIdeas = await leadMagnetIdeasResponse.json()
            leadMagnetIdeas = formatResponse(leadMagnetIdeas)
            
            const createPdfResponse = await fetch("api/send-pdf/create-pdf", {
                method: "POST",
                body: JSON.stringify({
                    username: formattedLeadName,
                    magnetIdeas: leadMagnetIdeas,
                }),
            });
    
            if (!createPdfResponse.ok) {
                throw new Error("Failed to create PDF");
            }
    
            const createPdfData = await createPdfResponse.json();
    
            if (createPdfData.pdfPath) {
                const uploadPdfResponse = await fetch("api/send-pdf/upload-pdf", {
                    method: "POST",
                    body: JSON.stringify({
                        username: formattedLeadName,
                        pdfPath: createPdfData.pdfPath,
                    }),
                });
    
                if (!uploadPdfResponse.ok) {
                    throw new Error("Failed to upload PDF");
                }
    
                const uploadPdfData = await uploadPdfResponse.json();
                console.log(uploadPdfData);
    
                const sendEmailResponse = await fetch("/api/send-pdf/send-email", {
                    method: "POST",
                    body: JSON.stringify({
                        username: formattedLeadName,
                        userEmail: leadDetails.emails,
                        userId: leadDetails.userId,
                    }),
                });
    
                if (!sendEmailResponse.ok) {
                    throw new Error("Failed to send email");
                }
    
                console.log("Success: Email sent successfully");
            }
        } catch (error) {
            console.log(error)
            console.error("Error processing business details:", error.message);
            // Handle error here, show an error message to the user, etc.
        }
    }; */

    const processBusinessDetails = async (leadDetails, userInput) => {
        const response = await fetch("https://hook.us1.make.com/wkmbid4pb5xeb1v94k6iir7p914ckomi", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set the content type to application/json
            },
            body: JSON.stringify({
                "leadDetails": leadDetails, // Assuming leadDetails is correctly formatted
                "userInput": userInput.current?.value // Ensure this value is not undefined
            }),
        });
        const responseData = await response.json()
        console.log(responseData)
        // router.push("https://bigbusiness.diemmo.com/thank-you")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLeadInfoGiven === false) {
			setDisplayPopupForm(true);
		} else {
            console.log(leadDetails)
            if (userInput.current?.value) {
                processBusinessDetails(leadDetails, userInput)     
            }
        }
        
    }

    useEffect(() => {
        console.log(userInput.current?.value)
        if (userInput.current?.value){
            if (leadDetails && Object.keys(leadDetails).length > 0) {
                processBusinessDetails(leadDetails, userInput);
            }
        }
    }, [leadDetails, userInput.current?.value])
    
	useEffect(() => {
		const leadInfo = JSON.parse(localStorage.getItem('LGAI-LeadInfo'));
        console.log(userInput.current?.value)
		// const leadInfo = false;
		if (leadInfo) {
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

