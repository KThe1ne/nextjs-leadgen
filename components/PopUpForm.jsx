import { Dialog, Transition } from "@headlessui/react";
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const leadData = new FormData(formRef.current);
		const [fullName, email, phoneNumber] = [
			leadData.get("fullName"),
			leadData.get("email"),
			leadData.get("phone"),
		];
		const data = {
			name: fullName,
			email: email,
			phone: phoneNumber,
		};
        
        await fetch("api/submitLeadData", {
            method: "POST", 
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        localStorage.setItem("LGAI-LeadInfo", JSON.stringify(data));
		setIsLeadInfoGiven(true)
		closePopUp();
	};

	return (
		<div>
			{isOpen && (
				<div className="z-10 bg-black/20 w-full h-full fixed flex justify-center items-center">
					<div className="bg-[#102F54] max-w-[600px] w-[400px] rounded-lg">
						<div className="p-4 flex justify-center items-center text-center pb-0 text-2xl font-semibold">
							<h3>
								You are this 🤏 close to a ton of new leads.
							</h3>
						</div>
						<form
							className="text-[#059C65]/20 p-5 flex flex-col gap-4 font-medium"
							onSubmit={handleSubmit}
							ref={formRef}
						>
							<input
								type="text"
								name="fullName"
								id="fullname"
								placeholder="Your name"
								className="p-3 rounded-md"
							/>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Your email"
								className="p-3 rounded-md"
							/>
							<input
								type="text"
								name="phone"
								id="phone"
								placeholder="Your phone number"
								className="p-3 rounded-md"
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