import { getAuthToken } from "../utils/genral.function";
const ENV = "DEV"
const BASE_URL = ENV==="DEV" ? "http://localhost:4000" : "https://kaptap-backend.vercel.app/";

const fetchController = async (endPoint, body={}) => {
    try {
        const token = getAuthToken()
        let reqBody = {}

        if(token){
            reqBody = {
                ...body,
                cookies : token
            }
        }else{
            reqBody = {
                ...body,
            }
        }
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqBody),
        };

        const response = await fetch(`${BASE_URL}/api/v1${endPoint}`, requestOptions);

        const data = await response.json();

        if (data.success) {
            return data;
        } else {
            throw new Error(data.message || "Unknown error occurred");
        }
    } catch (error) {
        throw new Error(`Error in fetchController: ${error.message}`);
    }
};

export default fetchController;
