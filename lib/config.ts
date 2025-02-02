const config = {
    env: {
      databaseUrl: process.env.DATABASE_URL,
      prodEndPoint: process.env.PROD_ENDPOINT,
      apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
      imagekit: {
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndPoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      },
      upstash: {
        redisUrl: process.env.UPSTASH_REDIS_URL,
        redisToken: process.env.UPSTASH_REDIS_TOKEN,
        qstashUrl: process.env.QSTASH_URL,
        qstashToken: process.env.QSTASH_TOKEN,
      },
      emailjs: {
        emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        emailjsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      },
      resendToken: process.env.RESEND_TOKEN,
      nodemailer:{
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
      }
    },
  };
  
  export default config;
  