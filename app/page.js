"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Tab } from "@headlessui/react";

import diemmoLogo from "../public/diemmo-logo.svg";
import gridPattern from "../public/grid.svg";
import PopUpForm from "@/app/components/PopUpForm";

const Home = () => {
	const [businessDetails, setBusinessDetails] = useState("");
	const [leadGenIdeas, setLeadGenIdeas] = useState("");
	const [loading, setLoading] = useState(0);
	const [isLeadInfoGiven, setIsLeadInfoGiven] = useState(false);
	const [displayPopupForm, setDisplayPopupForm] = useState(false);

	const ideaTabs = useRef(null);
	const userInput = useRef(null);

	useEffect(() => {
		// const leadInfo = localStorage.getItem('LGAI-LeadInfo');
		const leadInfo = false;
		if (leadInfo) {
			setIsLeadInfoGiven(true);
		}
	}, []);

	useEffect(() => {
		if (leadGenIdeas !== "") {
			ideaTabs.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [leadGenIdeas]);

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
	/* const formatResponse = (res) => {
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
	}; */

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(1);
		if (isLeadInfoGiven === false) {
			setDisplayPopupForm(true);
		}
		// console.log(userInput.current?.value)
		await fetch("/api/leadProblems", {
			method: "POST",
			body: JSON.stringify(userInput.current?.value),
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
				<div className="text-[#102F54]">
					Evaluating your business...
				</div>
			);
		}
		if (loading === 2) {
			return <div className="text-[#102F54]">Generating Ideas...</div>;
		}
	};

	const CtaButton = () => {
		return (
			<button
				className="bg-[#F46036] max-w-md w-max p-4 rounded-md font-semibold"
				type="submit"
				id="generateLead"
				disabled={loading}
			>
				{loading ? loadingElement : "Generate Lead Magnet Ideas"}
			</button>
		);
	};

	const capitalizeFirstLetter = (str) => {
		let formattedStr = "";
		str.split(" ").forEach((word) => {
			formattedStr += word.charAt(0).toUpperCase() + word.slice(1) + " ";
		});

		return formattedStr.trim();
	};

	return (
		<div className="overflow-y-auto">
			{displayPopupForm && (
				<PopUpForm
					setIsLeadInfoGiven={setIsLeadInfoGiven}
					isLeadInfoGiven={isLeadInfoGiven}
				/>
			)}
			{/* Header */}
			<div className="flex py-4 px-3 w-full gap-3 h-16 items-center border-b-[1px] border-[#102F54]/20 ">
				<Image
					src={diemmoLogo}
					alt=""
					className="fill-[#059C65] text-white"
					width={40}
				/>
				<span className="text-[#059C65] w-max font-bold">DIEMMO</span>
			</div>
			{/* Form */}
			<div className="flex justify-center flex-col gap-3 items-center p-4">
				<div className="flex content-center items-center justify-center w-full flex-col gap-10 h-[calc(100vh-(4rem+16px))]">
					<h2 className="font-extrabold text-6xl sm:text-5xl text-center h-max text-[#102F54]">
						LEAD GEN AI
					</h2>
					<h1 className="font-semibold text-2xl sm:text-lg text-center h-max text-[#102F54] max-w-lg">
						Stand out from your competitors and attract more
						customers with lead magnets that actually work.
					</h1>
					{
						<form
							onSubmit={handleSubmit}
							className="flex justify-center items-center flex-col gap-10 w-full"
							id="genLeadForm"
						>
							<textarea
								name="businessDetails"
								id=""
								cols="30"
								rows="5"
								placeholder="Describe your business here..."
								className="border-2 resize-none p-3 rounded-md sm:w-full max-w-2xl w-full text-[#102F54] ring-black/60 ring-offset-2"
								ref={userInput}
								minLength={10}
								required
							></textarea>
							{loading ? loadingElement() : <CtaButton />}
						</form>
					}
				</div>
				{leadGenIdeas !== "" && (
					<div
						ref={ideaTabs}
						className="flex flex-col items-center w-full md:max-w-2xl mb-7 min-h-screen justify-center mx-4"
					>
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
															: "text-blue-100 hover:bg-[#102F54]/30 hover:text-white"
													}`
												}
												key={leadGenMedium}
											>
												{capitalizeFirstLetter(
													leadGenMedium
												)}
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
																	{`${
																		idx + 1
																	}. ${leadGenIdea}`}
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
