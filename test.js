const arr = ['{', '  "software": [', '    "Customized online property listing tool for targeted advertising",', '    "AI-powered website optimization tool to improve online visibility",', '    "Interactive social media marketing planner for targeting ideal audience",', '    "Virtual property tour app for engaging potential leads",', '    "Intuitive property valuation calculator for accurate pricing strategies",', '    "Automated lead nurturing software for effective communication",', '    "Real-time property viewing scheduler for seamless buyer connections",', '    "Geo-targeted lead tracking tool for following up with potential leads",', '    "Automated email follow-up system for timely communication",', '    "AI-powered lead scoring tool for identifying high-quality leads"', '  ],', '  "information": [', '    "Comprehensive guide to effective property marketing strategies",', '    "Webinar on leveraging social media to attract potential buyers",', '    "Ebook on professional photography tips for property listings",', '    "Online course on home staging for maximum appeal",', '    "Presentation on current real estate market trends and pricing",', '    "Live virtual event on effective communication with potential buyers",', '    "Infographic on targeted advertising for property listings",', '    "Hacks and tips for effective property marketing",', '    "Checklist for successful property viewings",', '    "Whitepaper on understanding buyer psychology in real estate"', '  ],', '  "services": [', '    "Free professional property photography service for listings",', '    "Complimentary home staging consultation for optimal appeal",', '    "Personalized market analysis report for effective pricing strategies",', '    "Virtual property valuation service for accurate pricing",', '    "Free property listing optimization service for online visibility",', '    "Customized social media marketing strategy consultation",', '    "Lead nurturing and follow-up service for potential leads",', '    "Virtual property viewing coordination and management service",', '    "Real-time buyer engagement service for effective communication",', '    "AI-powered lead tracking and scoring service"', '  ],', '  "physical products": [', '    "Brochure showcasing property listing services and benefits",', '    "Customized property marketing kit with professional photography samples",', '    "Postcard with tips for effective property marketing",', '    "Informative flyer on current real estate market trends",', '    "Home staging guidebook for maximum appeal",', '    "Property valuation checklist for accurate pricing strategies",', '    "Buyer communication planner for effective engagement",', '    "Property viewing scheduler magnet for easy access",', '    "Lead follow-up reminder tool for timely communication",', '    "High-quality property listing photos for social media promotion"', '  ]', '}'] 

/* console.log(arr)
let leadGenDict = {};
let leadGenMedium = "";
arr.forEach((ele) => {
    if (!ele.trim().match(/^\d/) && ele.trim().endsWith(":")) {
        leadGenMedium = ele.trim().slice(0, -1);
        leadGenDict[leadGenMedium] = [];
    } else if (leadGenMedium) {
        leadGenDict[leadGenMedium].push(ele.trim());
    }
    console.log(leadGenDict)
});  */

const obj = {
    "leadMagnetIdeas": "{\n  \"software\": [\n    \"Customized online property listing tool for targeted advertising\",\n    \"AI-powered website optimization tool to improve online visibility\",\n    \"Interactive social media marketing planner for targeting ideal audience\",\n    \"Virtual property tour app for engaging potential leads\",\n    \"Intuitive property valuation calculator for accurate pricing strategies\",\n    \"Automated lead nurturing software for effective communication\",\n    \"Real-time property viewing scheduler for seamless buyer connections\",\n    \"Geo-targeted lead tracking tool for following up with potential leads\",\n    \"Automated email follow-up system for timely communication\",\n    \"AI-powered lead scoring tool for identifying high-quality leads\"\n  ],\n  \"information\": [\n    \"Comprehensive guide to effective property marketing strategies\",\n    \"Webinar on leveraging social media to attract potential buyers\",\n    \"Ebook on professional photography tips for property listings\",\n    \"Online course on home staging for maximum appeal\",\n    \"Presentation on current real estate market trends and pricing\",\n    \"Live virtual event on effective communication with potential buyers\",\n    \"Infographic on targeted advertising for property listings\",\n    \"Hacks and tips for effective property marketing\",\n    \"Checklist for successful property viewings\",\n    \"Whitepaper on understanding buyer psychology in real estate\"\n  ],\n  \"services\": [\n    \"Free professional property photography service for listings\",\n    \"Complimentary home staging consultation for optimal appeal\",\n    \"Personalized market analysis report for effective pricing strategies\",\n    \"Virtual property valuation service for accurate pricing\",\n    \"Free property listing optimization service for online visibility\",\n    \"Customized social media marketing strategy consultation\",\n    \"Lead nurturing and follow-up service for potential leads\",\n    \"Virtual property viewing coordination and management service\",\n    \"Real-time buyer engagement service for effective communication\",\n    \"AI-powered lead tracking and scoring service\"\n  ],\n  \"physical products\": [\n    \"Brochure showcasing property listing services and benefits\",\n    \"Customized property marketing kit with professional photography samples\",\n    \"Postcard with tips for effective property marketing\",\n    \"Informative flyer on current real estate market trends\",\n    \"Home staging guidebook for maximum appeal\",\n    \"Property valuation checklist for accurate pricing strategies\",\n    \"Buyer communication planner for effective engagement\",\n    \"Property viewing scheduler magnet for easy access\",\n    \"Lead follow-up reminder tool for timely communication\",\n    \"High-quality property listing photos for social media promotion\"\n  ]\n}"
}

const formatResponse = (res) => {
    res = res.leadMagnetIdeas;
    console.log(typeof(res))
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
}

// formatResponse(obj)

const formatResponse1 = (res) => {
    // Parse the JSON string into a JavaScript object
    const leadMagnetIdeas = JSON.parse(res.leadMagnetIdeas);

    return leadMagnetIdeas;
};

const result = formatResponse1(obj);
console.log(result);