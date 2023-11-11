"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Tab } from "@headlessui/react";

import diemmoLogo from "../public/diemmo-logo.svg";
import gridPattern from "../public/grid.svg";
import PopUpForm from "@/components/PopUpForm";


const Home = () => {
	const [businessDetails, setBusinessDetails] = useState("");
	const [leadGenIdeas, setLeadGenIdeas] = useState("");
	const [loading, setLoading] = useState(0)
	const [isLeadInfoGiven, setIsLeadInfoGiven] = useState(false)
	const [displayPopupForm, setDisplayPopupForm] = useState(false)

	const ideaTabs = useRef(null);

	useEffect(() => {
		const leadInfo = localStorage.getItem('LGAI-LeadInfo');
		if (leadInfo) {
			setIsLeadInfoGiven(true);
		}
	}, [])

	useEffect(() => {
		if(leadGenIdeas !== "") {
			ideaTabs.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [leadGenIdeas])

	const formatResponse = (res) => {
		res = res.leadMagnetIdeas;
		const arr = res.split("\n");
		let leadGenDict = {};
		let leadGenMedium = "";

		arr.forEach((ele) => {
			if (!ele.trim().match(/^\d/) && ele.trim().endsWith(":")) {
				leadGenMedium = ele.trim().slice(0, -1);
				leadGenDict[leadGenMedium] = [];
			} else if (leadGenMedium) {
				leadGenDict[leadGenMedium].push(ele.trim());
			}
		});

		return leadGenDict;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(1)
		if (isLeadInfoGiven === false){
			setDisplayPopupForm(true)
		}
		await fetch("/api/leadProblems", {
			method: "POST",
			body: JSON.stringify(businessDetails),
		})
		.then((res) => {
			const leadProblems = res.json();
			return leadProblems;
		})
		.then(async (leadProblems) => {
			setLoading(2)
			await fetch("/api/leadGenIdeas", {
				method: "POST",
				body: JSON.stringify(leadProblems),
			})
			.then((res) => {
				res = res.json()
				return res;
			})
			.then((res) => {
				const leadGenDict = formatResponse(res);
				setLoading(0)
				setLeadGenIdeas(leadGenDict);
			});
		})
	};

	const loadingElement = () => {
		if (loading === 1) {
			return (
				<div className="flex min-w-[480px] gap-1 text-[#102F54]">
					Evaluating your business...
				</div>
			)
		}
		if (loading === 2) {
			return (
				<div className="bg-red-800">Generating Ideas...</div>
			)
		}
	}

	const CtaButton = () => {
		return (
			<div className="bg-[#F46036] max-w-md w-max p-4 rounded-md">Generate Lead Magnet Ideas</div>
		)
	}

	return (
		<div className="overflow-y-auto">
			{displayPopupForm && (
				< PopUpForm 
					setIsLeadInfoGiven={setIsLeadInfoGiven} 
					isLeadInfoGiven={isLeadInfoGiven}
				/>
			)}
			{/* Header */}
			<div className="flex py-4 px-3 w-full gap-3 items-center border-b-[1px] border-[#102F54]/20 ">
				<Image
					src={diemmoLogo}
					alt=""
					className="fill-[#059C65] text-white"
					width={40}
				/>
				<span className="text-[#059C65] w-max font-bold">DIEMMO</span>
			</div>
			{/* Form */}
			<div className="flex justify-center flex-col gap-3 items-center">
				<div className="flex content-center items-center justify-center w-full flex-col gap-10 h-[calc(100vh-3.5rem)]">
					<h2 className="font-extrabold text-6xl sm:text-5xl text-center h-max text-[#102F54]">
						LEAD GEN AI
					</h2>
					<h1 className="font-medium text-2xl sm:text-lg text-center h-max text-[#102F54] max-w-lg">
						Stand out from your competitors and attract more
						customers with lead magnets that actually work.
					</h1>
					<div className="flex border-solid border-2  border-[#059C65] rounded-full h-14 w-1/3 overflow-hidden">
						<input
							type="text"
							className="bg-transparent h-14 w-1/3 p-3 basis-10/12 flex-shrink-0 outline-none text-[#102F54]"
							onChange={(e) => {
								setBusinessDetails(e.target.value);
							}}
							placeholder="Describe your business here..."
						/>
						<button
							className="bg-[#F46036] w-full flex justify-center items-center"
							onClick={handleSubmit}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6 text-white"
							>
								<path
									fillRule="evenodd"
									d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					{loading ? loadingElement() : <CtaButton /> }
				</div>
				{leadGenIdeas !== "" && (
					<div ref={ideaTabs} className="flex flex-col items-center w-3/4 max-w-2xl mb-7 min-h-screen justify-center">
						<Tab.Group>
							<Tab.List className="flex space-x-1 rounded-xl bg-[#059C65]/70 p-1 w-full">
								{Object.keys(leadGenIdeas).map(
									(leadGenMedium, idx) => {
										return (
											<Tab
												className={({ selected }) =>
													`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#102F54] ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
														selected
															? "bg-white shadow"
															: "text-blue-100 hover:bg-[#102F54]/[0.3] hover:text-white"
													}`
												}
												key={leadGenMedium}
											>
												{leadGenMedium}
											</Tab>
										);
									}
								)}
							</Tab.List>
							<Tab.Panels className={"mt-2 w-full"}>
								{Object.values(leadGenIdeas).map(
									(leadGenIdeas, idx) => {
										return (
											<Tab.Panel
												className={
													"rounded-xl p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-black bg-[#E2FFF4] w-full"
												}
												key={`leadGenIdeas-${idx}`}
											>
												<ul>
													{leadGenIdeas.map(
														(leadGenIdea, idx) => {
															return (
																<li
																	className="relative rounded-md p-3 w-full hover:bg-white"
																	key={`leadGenIdea-${idx}`}
																>
																	{
																		leadGenIdea
																	}
																</li>
															);
														}
													)}
												</ul>
											</Tab.Panel>
										);
									}
								)}
							</Tab.Panels>
						</Tab.Group>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
