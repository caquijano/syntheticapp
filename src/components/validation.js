export function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es|co|me|ven|ue)+$/;
    return re.test(email);
}