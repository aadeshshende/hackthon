function createSuccessResult(data) {
    return {status:'Success',data};
}

function createErrorResult(error) {
    return {status:'Failed',error};
}

function createResult(error,data) {
    if (error) {
        return createErrorResult(error);
    } else {
        return createSuccessResult(data);
    }
}

module.exports={
    createSuccessResult,
    createErrorResult,
    createResult,
}