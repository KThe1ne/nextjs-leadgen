import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OutputFixingParser, StructuredOutputParser } from "langchain/output_parsers";
import { BufferMemory } from "langchain/memory";

const model = new OpenAI({
    //!Remove
    openAIApiKey: "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",
    temperature: 0.8,
    maxTokens: 2048
});

export const findProblems = async (businessDetails) => {

    const prompt = new PromptTemplate({
        template: "You are a business mastermind. You understand businesses and their intended customers. You understand all types of businesses, the services they offer and who they offer them to. Mostly important you understand the intended customers of these businesses, their want and needs, the broad and narrow problems they face. For example if the aim of the business is to help homeowners sell their houses (the broad solution), the homeowner(the intended customer) has the narrow problems of finding their home's worth, increasing the home value, getting pictures for listing, cleaning the house, landscaping, repairs, moving services, etc. Using your expertise you can 1. Describe the intended audience 2. Outline the narrow problems they may face before receiving the business' main services, given details about the business. Here are your instructions:{instructions}.",
        inputVariables: ["instructions"],
    });

    const narrowProblemsChain = new LLMChain({
        llm: model, 
        prompt: prompt,
    }); 

    let instruction1 = `Outline their narrow problems, given details about the business. Here are the business details: ${businessDetails}.`

    const res = await narrowProblemsChain.call({ 
        instructions: instruction1,
    });
    console.log(res.text)

    const instruction2 = `Given ${res.text}. For each narrow problem. Create a comprehensive list of narrower problems. Output the business, the intended audience, and the list of problems.`

    const res2 = await narrowProblemsChain.call({
        instructions: instruction2,
    })

    return res2.text

}



export const generateLeadMagnetIdeas = async (narrowProblems) => {
    const prompt = new PromptTemplate({
        template: "You are a lead generation mastermind. Given a list of narrow problems an audience faces you are able to generate lead magnets that will engage the audience, build trust and convert a large percent of the audience into engaged, qualified leads. Your lead magnets are generally distributed through four mediums: software (a tool that can help them solve the problem such as a spreadsheet, notion template, dashboard, a free app or website they can visit, etc.), information (pdf/ word docs, courses, presentations, live events, webinars, hacks/tips, infographics, etc.), services (free services that can be offered to the audience that solves or highlights the narrow problem), physical products (an item that can be given to them for free like a brochure, or for example a posture assessment chart for chiropractor leads). Through those mediums there are three types of lead magnets: lead magnets that reveals/diagnoses the problem (for example a website speed test to highlight that their website is loading slower than it should or free posture analysis to highlight what's wrong their posture) or samples and trials (provide limited or brief full access to the company's core offering) or one step of the business' multi-step core offer. Your aim is to provide lead magnet ideas that offers a large amount of value to the intended audience and get them wanting to be a customer. Please help generate 20 lead magnet ideas based on the problems the audience faces, separate them by medium. Here are the business details: {businessDetails}.",
        inputVariables: ["businessDetails"]
    })

    const leadMagnetChain = new LLMChain({
        llm: model, 
        prompt: prompt,
    }); 

    const res = await leadMagnetChain.call({ 
        businessDetails: narrowProblems,
    });

    return(res.text)
}


const leadGenIdeas = async (business_details) => {
    const narrowProblems = await findProblems(business_details)
    console.log(narrowProblems)
    const ideas = await generateLeadMagnetIdeas(narrowProblems)
    return ideas
}

export default leadGenIdeas
