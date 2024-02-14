import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OutputFixingParser, StructuredOutputParser } from "langchain/output_parsers";
import { BufferMemory } from "langchain/memory";


const openAI_api_key = process.env.OPENAI_API_KEY;


const model = new OpenAI({
    openAIApiKey: `${openAI_api_key}`,
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0.8,
    maxTokens: 2048, 
    response_format: {
        "type": "json_object"
    }
});

export const findProblems = async (businessDetails) => {

    const prompt = new PromptTemplate({
        template: "Identify Your Audience & Their Challenges: Imagine you're a seasoned business strategist with an in-depth understanding of diverse markets and their unique customer needs. Your task is to pinpoint the specific audience for a given business and outline the precise challenges they face before they can fully benefit from the business's services. For instance, if the focus is on helping homeowners sell their homes, challenges might include accurately valuing their property, enhancing curb appeal, or preparing for showings. Here are your instructions:{instructions}.",
        inputVariables: ["instructions"],
    });

    const narrowProblemsChain = new LLMChain({
        llm: model, 
        prompt: prompt,
    }); 

    let instruction1 = `Now, identify the target audience and list their specific challenges , given business details enclosed by '***'. The business details are: ***${businessDetails}***. If business details are not enclosed within '***' then your response should be the word 'null' only.`

    const res = await narrowProblemsChain.call({ 
        instructions: instruction1,
    });
    console.log(res.text)

    const instruction2 = `Building on ${res.text}, delve deeper into each identified challenge. Transform broad issues into a granular list of obstacles that precisely describe what the audience is struggling with. This step is crucial for crafting solutions that resonate deeply with potential customers. For example, breaking down 'preparing for showings' into more specific tasks like 'decluttering living spaces' and 'neutralizing pet odors' gives clearer insight into the homeowner's needs. Expand each challenge into detailed sub-challenges and present your findings, showcasing the business, its audience, and their nuanced challenges.`

    const res2 = await narrowProblemsChain.call({
        instructions: instruction2,
    })

    return res2.text

}



export const generateLeadMagnetIdeas = async (narrowProblems) => {
    const prompt = new PromptTemplate({
        template: "Craft Compelling Lead Magnets: As a master of lead generation, your aim is to create lead magnets that not only attract but also convert your target audience into eager, qualified leads. Given a list of narrow problems an audience faces you are able to generate lead magnets that will engage the audience, build trust and convert a large percent of the audience into engaged, qualified leads. Your lead magnets are generally distributed through four mediums: software (a tool that can help them solve the problem such as a spreadsheet, notion template, dashboard, a free app or website they can visit, etc.), information (pdf/ word docs, courses, presentations, live events, webinars, hacks/tips, infographics, etc.), services (free services that can be offered to the audience that solves or highlights the narrow problem), physical products (an item that can be given to them for free like a brochure, or for example a posture assessment chart for chiropractor leads). Through those mediums there are three types of lead magnets: lead magnets that reveals/diagnoses the problem (for example a website speed test to highlight that their website is loading slower than it should or free posture analysis to highlight what's wrong their posture) or samples and trials (provide limited or brief full access to the company's core offering) or one step of the business' multi-step core offer. Your aim is to provide lead magnet ideas that offers a large amount of value to the intended audience and get them wanting to be a customer. Please generate 40 lead magnet ideas based on the problems the audience faces, separate them by medium. Here are the business details: {businessDetails}. Your output should only contain the medium followed by a list of 10 its respective lead magnet ideas. Each idea set of ideas should be numbered from 1-10. Note each idea should be succinctly described in two sentences, directly highlighting how it benefits the user. No additional text should be outputted. Output in the JSON format where the keys are the mediums like 'software' and 'information' and the values are the comma separated list of 10 unnumbered lead magnet ideas enclosed in square brackets.",
        inputVariables: ["businessDetails"]
    })

    const leadMagnetChain = new LLMChain({
        llm: model, 
        prompt: prompt,
    }); 

    const res = await leadMagnetChain.call({ 
        businessDetails: narrowProblems,
    });

    console.log(res.text)

    return(res.text)
}

/* export const submitLeadInfo = async (leadData) => {
    let res = {}
    console.log(ghl_api_key)
    console.log(part_api_key)
    await fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            body: JSON.stringify(leadData),
            headers: {
                Authorization: `Bearer ${ghl_api_key}`,
                'content-type': 'application/json'
              },
        })
        .then((res) => res.json())
        .then((response) => {
            res = response
            console.log(response)
        })
    return res
} */



// export default leadGenIdeas