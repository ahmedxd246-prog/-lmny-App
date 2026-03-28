import cors from 'cors'

const allowedOrigin = process.env.ALLOWED_ORIGIN?.split(',') || [];
const corsOptions = {
    origin:function(origin,cb){
        if(!origin) return cb(null,true);

        if(allowedOrigin.includes(origin)){
            return cb(null,true);
        }else{
            cb(new Error('Not allowed by CORS'),false);
        }
    },
    credentials:true,
    optionsSuccessStatus:200,

    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With"]
}


export default cors(corsOptions);   