'use client'

import { Fragment, useState, useRef } from "react";

const PopUpForm = ({ setIsLeadInfoGiven, isLeadInfoGiven }) => {
	const [isOpen, setIsOpen] = useState(true);
	const formRef = useRef();

	const closePopUp = () => {
		setIsOpen(false);
	};

	function openPopUp() {
		setIsOpen(true);
	}

	const facebookPixelLeadEvent = () => {
		fbq('track', 'Lead');
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const leadData = new FormData(formRef.current);
		const [fullName, email, phoneNumber, companyPosition, companyName] = [
			leadData.get("fullName"),
			leadData.get("email"),
			leadData.get("phone"),
			leadData.get("position"),
			leadData.get("company_name"),
		];
		const data = {
			name: fullName,
			email: email,
			phone: phoneNumber,
            company_position: companyPosition,
            source: "LeadGenAI",
            customField: {
                // #Hard-Coded
                "vx5RJb83ApMDaVizD3Ar": companyPosition
            },
            companyName: companyName,            
		};

		await fetch("api/submitLeadData", {
			method: "POST",
			body: JSON.stringify(data),
		})
		.then((res) => res.json())
		.then((res) => {
			data["userId"] = res["id"]
		})
		.then(() => facebookPixelLeadEvent());
		localStorage.setItem("LGAI-LeadInfo", JSON.stringify(data));
		setIsLeadInfoGiven(true);
		closePopUp();
	};

	return (
		<div>
			{isOpen && (
				<div className="z-10 w-full h-full fixed flex justify-center items-center top-0 left-0">
					<div className="w-full h-full bg-[#102F54]/20 backdrop-blur-sm"></div>
					<div className="absolute z-20 bg-[#102F54] max-w-[600px] w-[400px] rounded-lg">
						<div className="p-4 flex justify-center items-center text-center pb-0 text-2xl font-semibold">
							<h3>
							You are this 🤏 close to a ton of new leads.
							</h3>
						</div>
						<form
							className="text-[#059C65]/20 p-5 flex flex-col gap-4 font-medium"
							onSubmit={handleSubmit}
							ref={formRef}
                            id="leadForm"
						>
							<input
								type="text"
								name="fullName"
								id="fullname"
								placeholder="Your name"
								className="p-3 rounded-md text-[#102F54]"
                                required
							/>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Your email"
								className="p-3 rounded-md text-[#102F54]"
                                required
							/>
							<input
								type="text"
								name="phone"
								id="phone"
								placeholder="Your phone number"
								className="p-3 rounded-md text-[#102F54]"
                                required
							/>
                            <hr />
                            <p className="text-white">Company Position</p>
							<div className="flex flex-row gap-4">
                                <div>
                                    <input
                                        type="radio"
                                        name="position"
                                        id="owner"
                                        value="Owner"
                                        className="p-3 rounded-md text-[#102F54]"
                                    />
                                    <label htmlFor="marketer" className="text-white m-2">Owner</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="position"
                                        id="marketer"
                                        value="Marketer"
                                        className="p-3 rounded-md text-[#102F54]"
                                    />
                                    <label htmlFor="marketer" className="text-white m-2">Marketer</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="position"
                                        id="marketer"
                                        value="Marketer"
                                        className="p-3 rounded-md text-[#102F54]"
                                    />
                                    <label htmlFor="marketer" className="text-white m-2">Other</label>
                                </div>
                            </div>
                            <input
								type="text"
								name="company_name"
								id="company_name"
								placeholder="Company Name"
								className="p-3 rounded-md text-[#102F54]"
                                required
							/>
							<button
								type="submit"
								className="text-white font-bold bg-[#F46036] p-3 my-3 rounded-md uppercase"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PopUpForm;

/* isOpen && (
			<div>
				<iframe
					src="https://api.diemmo.com/widget/form/kLBZVL8bLCIFLEad8iws"
					style={
						{
							display:'none',
							width:'100%',
							height:'100%',
							border:'none',
							'border-radius':'8px',
						}
					}
					id="popup-kLBZVL8bLCIFLEad8iws" 
					data-layout="{'id':'POPUP'}"
					data-trigger-type="alwaysShow"
					data-trigger-value=""
					data-activation-type="alwaysActivated"
					data-activation-value=""
					data-deactivation-type="leadCollected"
					data-deactivation-value=""
					data-form-name="LeadGenAI - Form"
					data-height="584"
					data-layout-iframe-id="popup-kLBZVL8bLCIFLEad8iws"
					data-form-id="kLBZVL8bLCIFLEad8iws"
					title="LeadGenAI - Form"
						>
				</iframe>
				<script src="https://api.diemmo.com/js/form_embed.js"></script>
			</div>) */

{/*  */}