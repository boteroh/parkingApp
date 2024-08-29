import {connect} from 'mongoose';

const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Connect to database');
    } catch (error) {
        console.log(error);        
    }
};

export default dbconnect;