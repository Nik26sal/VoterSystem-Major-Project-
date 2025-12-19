const { Verification_Email_Template, Welcome_Email_Template } = require("./email_template.js");
const {transporter} = require('./email_config.js')
const sendVerificationEamil=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: `${process.env.EMAIL}`,
            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response)
        return true;
    } catch (error) {
        console.log('Email error',error)
        return false;
    }
}
const sendWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: `${process.env.EMAIL}`,
            to: email,
            subject: "Welcome Email",
            text: "Welcome Email",
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully for welcome',response)
        return true;
    } catch (error) {
        console.log('Email error',error)
        return false;
    }
}


module.exports = {sendVerificationEamil, sendWelcomeEmail};