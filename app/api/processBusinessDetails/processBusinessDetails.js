/* export const processBusinessDetails = async (leadDetails) => {

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
};

 */