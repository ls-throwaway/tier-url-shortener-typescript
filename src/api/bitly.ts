import axios from 'axios';

const GROUP_ID = 'Bl6of4cGxvT';
const TOKEN = process.env.REACT_APP_BITLY_AUTORIZATION_TOKEN;

const bitlyApiEndpoint = axios.create({
    baseURL: process.env.REACT_APP_BITLY_API_ENDPOINT,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
    },
});

const shortenUrl = async (
    url: string,
    groupId = GROUP_ID,
): Promise<BitlyShortenUrlResponse> => {
    try {
        const response = await bitlyApiEndpoint.post<BitlyShortenUrlResponse>(
            '/shorten',
            {
                long_url: url,
                domain: 'bit.ly',
                group_guid: groupId,
            },
        );

        return response.data;
    } catch (err) {
        // Replace with error tracing
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
    }
};

export default { shortenUrl };
