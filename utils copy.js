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
        template: "You are a business mastermind. You understand businesses and their intended customers. You understand all types of businesses, the services they offer and who they offer them to. Mostly important you understand the intended customers of these businesses, their want and needs, the broad and narrow problems they face. For example if the business' main service is to help homeowners sell their houses (the broad solution), the homeowner(the intended customer) has the narrow problems of finding their home's worth, increasing the home value, getting pictures for listing, cleaning the house, landscaping, repairs, moving services, etc. Using your expertise you can 1. Describe the intended audience 2. Outline the narrow problems they may face before receiving the business' main services, given details about the business. Here are your instructions:{instructions}.",
        inputVariables: ["instructions"],
    });

    const narrowProblemsChain = new LLMChain({
        llm: model, 
        prompt: prompt,
    }); 

    let instruction1 = `Outline their narrow problems, given business details enclosed by '***'. The business details are: ***${businessDetails}***. If business details are not enclosed within '***' then your response should be the word 'null' only. `

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
        template: "You are a lead generation mastermind. Given a list of narrow problems an audience faces you are able to generate lead magnets that will engage the audience, build trust and convert a large percent of the audience into engaged, qualified leads. Your lead magnets are generally distributed through four mediums: software (a tool that can help them solve the problem such as a spreadsheet, notion template, dashboard, a free app or website they can visit, etc.), information (pdf/ word docs, courses, presentations, live events, webinars, hacks/tips, infographics, etc.), services (free services that can be offered to the audience that solves or highlights the narrow problem), physical products (an item that can be given to them for free like a brochure, or for example a posture assessment chart for chiropractor leads). Through those mediums there are three types of lead magnets: lead magnets that reveals/diagnoses the problem (for example a website speed test to highlight that their website is loading slower than it should or free posture analysis to highlight what's wrong their posture) or samples and trials (provide limited or brief full access to the company's core offering) or one step of the business' multi-step core offer. Your aim is to provide lead magnet ideas that offers a large amount of value to the intended audience and get them wanting to be a customer. Please generate 40 lead magnet ideas based on the problems the audience faces, separate them by medium. Here are the business details: {businessDetails}. Your output should only contain the medium followed by a list of 10 its respective lead magnet ideas. Each idea set of ideas should be numbered from 1-10 and each idea should be expressed in two easy to under sentences. No additional text should be outputted. Output in the JSON format where the keys are the mediums like 'software' and 'information' and the values are the comma separated list of 10 unnumbered lead magnet ideas enclosed in square brackets.",
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

/* createLeadMagnetDoc({"docName":"busi","leadMagnetIdeas":{"software":["Budget Calculator Tool: A user-friendly spreadsheet that helps homeowners input project details to estimate costs and create a comprehensive renovation budget.","Design Inspiration App: An app showcasing various design styles, materials, and color schemes to help homeowners overcome decision fatigue and find inspiration for their renovation.","Project Timeline Tracker: A dashboard tool that allows homeowners to track milestones, deadlines, and progress to effectively manage project timelines and avoid delays.","Contractor Comparison Tool: An online tool that enables homeowners to compare contractor reviews, ratings, and quotes to make informed decisions when selecting a contractor.","Virtual Room Planner: A software tool that allows homeowners to digitally visualize different layout options and furniture placements to align their vision before starting the renovation.","Renovation Cost Estimator: An online calculator that provides an instant estimate of renovation costs based on project details, helping homeowners set realistic budgets.","Material Cost Comparison Tool: A software tool that compares prices of materials from different suppliers to help homeowners find cost-effective alternatives without compromising quality.","Virtual Reality Home Tours: An interactive app offering virtual tours of renovated homes for design inspiration and to help homeowners visualize the end result of their renovation project.","Permit Checklist Generator: A tool that generates a customized checklist of permit requirements based on the renovation project, simplifying the permit application process for homeowners.","Subcontractor Directory: A searchable database of vetted subcontractors and tradespeople with reviews and recommendations to assist homeowners in finding quality professionals for their renovation."],"information":["Renovation Budgeting Guide: A comprehensive PDF guide that outlines tips, strategies, and best practices for effectively managing a renovation budget.","Ultimate Renovation Decision-Making Checklist: A downloadable checklist that guides homeowners through the decision-making process of selecting materials, designs, and contractors.","Quality Control Handbook: An in-depth resource highlighting common quality issues in renovations and how to address them, empowering homeowners to maintain standards.","Renovation Project Planning Webinar: A live webinar session hosted by renovation experts sharing insights and strategies for successful project planning and execution.","Vision Board Template: A printable template for creating a vision board to visually communicate renovation ideas and preferences with contractors and design professionals.","DIY Home Improvement Hacks Ebook: An ebook featuring DIY tips and tricks for simple home improvements, empowering homeowners to tackle small projects themselves.","Renovation Mistakes to Avoid Infographic: A visual guide outlining common renovation mistakes and how to prevent them, helping homeowners navigate the renovation process with ease.","Contractor Interview Question Guide: A resource with a list of essential questions to ask potential contractors during interviews to ensure the right fit for the renovation project.","Material Swatch Samples: A physical package containing swatches of popular renovation materials for homeowners to compare textures, colors, and quality before making decisions.","Renovation Project Planning Workbook: A downloadable workbook with templates and prompts to guide homeowners through planning, designing, and executing their renovation project."],"services":["Free Budget Consultation: A complimentary one-on-one consultation with a renovation budgeting expert to help homeowners outline their budget and cost-saving strategies.","Virtual Design Consultation: A free virtual consultation with a design specialist to provide personalized recommendations and design solutions for renovation projects.","Quality Assurance Inspection: A free onsite inspection by a quality assurance expert to assess ongoing renovation work and provide feedback on maintaining quality standards.","Permit Application Assistance: Free assistance from permit specialists in compiling and submitting permit applications to streamline the approval process for renovation projects.","Material Sample Delivery: A free service offering the delivery of material samples directly to homeowners' doors, allowing them to see and feel the materials before making decisions.","Renovation Planning Workshop: An in-person or virtual workshop conducted by renovation professionals, offering guidance on planning, budgeting, and managing renovation projects.","Post-Renovation Walkthrough: A complimentary walkthrough with a renovation specialist to ensure that completed work meets expectations and address any final concerns.","Exclusive Contractor Discounts: Access to special discounts and promotions from partnered contractors and suppliers to help homeowners save on renovation costs.","DIY Renovation Guide Session: A free session with DIY experts sharing tips and tricks for homeowners interested in taking on renovation tasks themselves.","Renovation Project Management Trial: A limited-time trial of project management services to help homeowners experience the benefits of professional oversight and coordination during renovations."],"physical products":["Renovation Inspiration Magazine: A printed magazine featuring home renovation trends, tips, and case studies to spark ideas and inspiration for homeowners.","Material Samples Kit: A physical kit containing samples of flooring, paint, tiles, and other materials for homeowners to visualize and select options for their renovation project.","Vision Board Starter Pack: A kit including a vision board, pins, and design magazines to help homeowners create a visual representation of their renovation goals and preferences.","Renovation Planning Checklist: A printed checklist outlining essential steps for planning a renovation project, serving as a practical guide for homeowners.","Quality Control Inspection Tools: A set of tools, including a measuring tape and level, to empower homeowners to conduct simple quality checks during the renovation process.","Renovation Ideas Catalog: A booklet showcasing various renovation ideas, layouts, and design inspirations to assist homeowners in defining their project scope.","Home Improvement Planning Journal: A physical journal with prompts and sections for documenting ideas, budgets, and progress throughout the renovation journey.","Post-Renovation Care Package: A package containing maintenance guides, cleaning supplies, and useful tips to help homeowners care for their renovated spaces effectively.","Renovation Timeline Poster: A visual timeline poster displaying key stages of the renovation process to keep homeowners informed and on track with the project.","Design Style Guidebook: A compact guidebook outlining popular design styles and elements to aid homeowners in making cohesive design choices for their renovation."]}}) */