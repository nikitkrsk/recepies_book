import fetch from 'node-fetch'
export const sendVerificationEmail = async (token, host, to) => {
    const url = "https://api.smtp2go.com/v3/email/send";
    const emailbody = {
        "api_key": process.env.SMTP_API_KEY,
        "to": [`Recepies User <${to}>`],
        "sender": "NO_REPLY_RECEPIES_SUPPORT <hi@atroshenkonikita.com>",
        "subject": "Verify Your Account at Recepies.dev",
        "text_body": 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + host + '\/api\/micro_users\/user\/confirm_email\/' + token.token + '.\n',
    }
    const params = {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify(emailbody)
    }
    try{
        let res = await fetch(url, params);
        return res.json();
    }catch (er){
        console.log("Error", er)
        throw new Error()
    }
}

export const sendResetPasswordEmail = async (token, host, to) => {
    const url = "https://api.smtp2go.com/v3/email/send";
    const emailbody = {
        "api_key": "api-13369F62E92A11EA943BF23C91BBF4A0", // TODO SECRET
        "to": [`Test Person <${to}>`],
        "sender": "REPLY_RECEPIES_SUPPORT <nikita@airheadventures.com>",
        "subject": "Recepies Platform Password Reset",
        "text_body": 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'https://' + host + '\/reset_password\/' + token.token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }
    const params = {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify(emailbody)
    }
    try{
        let res = await fetch(url, params);
        return res.json();
    }catch{
        throw new Error()
    }
}