const jsonpath = require('jsonpath');

export default async (expectedOptions: any, job: any, prevJobData: any, successCallback: (data: any) => void) => {
    const providedOptions = job?.options
    let methods: string[] = expectedOptions?.method?.split("|")
    methods = methods.map((method: string) => {
        method = method.trim()
        method = method.replaceAll("\'", "")
        return method
    })

    if (!methods.includes(providedOptions?.method)) {
        console.error(`Failed to execute job ${job?.id}. Reason: Invalid option method provided`)
        return
    }

    if (providedOptions?.url !== "") {
        await fetch(providedOptions?.url, {
            body: translateData(prevJobData, providedOptions?.body),
            headers: {
                "Content-Type": "application/json",
                ...providedOptions?.headers
            },
            method: providedOptions?.method
        }).then(async (response: any) => {
            let jsonResponse
            try {
                jsonResponse = await response.json()
            } catch (error) {
                jsonResponse = response
            }
            successCallback(jsonResponse)
        }).catch(error => {
            console.error(error)
            successCallback(error)
        })
        
    }


}

const translateData = (prevJobData: any, providedOptionsData: any): any => {
    const prevOutputPlaceholder = '$PREV_OUTPUT';

    if (prevJobData === null) return providedOptionsData

    // Check if the body contains the $PREV_OUTPUT placeholder
    if (providedOptionsData.includes(prevOutputPlaceholder)) {
      if (providedOptionsData === prevOutputPlaceholder) {
        return prevJobData
      } else {
        try {
            // Wrap the previousJobData in an object
            let data
            try {
                data = JSON.parse(prevJobData)
            } catch (error) {
                data = {}
            }
            const wrappedData = { results: data };

            // Replace the placeholder with the updated JSONPath expression
            const jsonPathExpression = providedOptionsData.replace(prevOutputPlaceholder, '$.results');

            // Use jsonpath to extract data from the wrapped data
            const extractedData = jsonpath.query(wrappedData, jsonPathExpression);

            // Return the extracted data
            return extractedData.length > 0 ? extractedData.length === 1 ? JSON.stringify(extractedData[0]) : JSON.stringify(extractedData) : null;

        } catch (error) {
            console.error('Error processing JSONPath:', error);
            // Return null or handle the error as needed
            return null;
        }
      }
    } else {
      // If the body does not contain $PREV_OUTPUT, return it as it is
      return providedOptionsData;
    }
}