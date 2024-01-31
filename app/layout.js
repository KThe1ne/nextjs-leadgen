import Analytics from "@/app/components/Analytics";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { Suspense } from "react";
import Image from "next/image";
import diemmoLogo from "../public/diemmo-logo.svg";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Lead Magnet Generator",
	description:
		"Get ideas for a lead magnet that will help you attract more customers and stand out from your competitors.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
			<Head></Head>
			<body className={montserrat.className}>
				<Suspense>
					<Analytics />
				</Suspense>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					{/* <iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-544GVJ2Z"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe> */}
				</noscript>
				<div className="flex py-4 px-3 w-full gap-3 h-16 items-center border-b-[1px] border-[#102F54]/20 ">
				<Image
					src={diemmoLogo}
					alt=""
					className="fill-[#059C65] text-white"
					width={40}
				/>
				<span className="text-[#059C65] w-max font-bold">DIEMMO</span>
			</div>
				{children}
				{/* End Google Tag Manager (noscript) */}
			</body>
		</html>
	);
}
