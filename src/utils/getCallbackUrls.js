import { config } from 'dotenv';

config();
const environment = process.env.NODE_ENV;
const testEnvironment = !(environment === 'development' || environment === 'staging' || environment === 'production');
const productionEnvironment = environment === 'production' || environment === 'staging';
let baseUrl;

if (productionEnvironment) baseUrl = 'https://trail-staging.herokuapp.com/api/v1';
else baseUrl = 'http://localhost:5000/api/v1';

export default {
	baseUrl,
	testEnvironment
};
