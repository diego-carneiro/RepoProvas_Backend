export function returnError(error: string) {
	if(error === "userIssue"){
        return {
            type: 'error_conflict',
            message: "Something went wrong with user credentials"
        };
    }
    
}


