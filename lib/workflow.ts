import { Client as WorkflowClient } from "@upstash/workflow";
import nodemailer from 'nodemailer';
import config from "@/lib/config"

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
  });



export const sendEmail = async({to_email,subject,text}:{to_email:string,subject:string,text:string}) =>{    
    const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
        user: 'metinisikcan@gmail.com',
        pass: 'pyrometin012345',
    },
    });



    const options = {
    from: 'metinisikcan@gmail.com',
    to: to_email,
    subject: subject,
    text:text

    };

    await transporter.sendMail(options);}