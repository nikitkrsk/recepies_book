import fetch from 'node-fetch'
export const sendVerificationEmail = async (token, host, to) => {
    const url = "https://api.smtp2go.com/v3/email/send";
    const emailbody = {
        "api_key": process.env.SMTP_API_KEY,
        "to": [`Test Person <${to}>`],
        "sender": "NO-REPLY Recepies Support  <hi@atroshenkonikita.com>",
        "subject": "Verify Your Account at Recepies.dev",
        "text_body": 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + host + '\/api\/auth\/confirm_email\/' + token.token + '.\n',
        // "html_body": "<h1>You're my favorite test person ever</h1>",
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
        return null
    }
}