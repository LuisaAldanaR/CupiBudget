/**
 * A utility function that provides HTTP request methods such as GET, POST, PUT, and DELETE.
 * @returns {object} An object containing HTTP request methods.
 */
export const helpHttp = () => 
{
    /**
     * Performs a custom HTTP fetch request.
     * @param {string} endpoint - The endpoint URL for the request.
     * @param {object} options - An options object for configuring the request.
     * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
     */
    const customFetch = (endpoint, options) => {
        const defaultHeader = {
            accept: "application/json",
            
        };

        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;

        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        //console.log(options);
        setTimeout(() => controller.abort(), 3000);

        return fetch(endpoint, options)
            .then((res) =>
                res.ok
                    ? res.json()
                    : Promise.reject({
                        err: true,
                        status: res.status || "00",
                        statusText: res.statusText || "An error occurred",
                    })
            )
            .catch((err) => err);
    };

    /**
     * Performs a GET request.
     * @param {string} url - The URL to send the GET request to.
     * @param {object} options - An options object for configuring the GET request.
     * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
     */
    const get = (url, options = {}) => customFetch(url, options);

    /**
     * Performs a POST request.
     * @param {string} url - The URL to send the POST request to.
     * @param {object} options - An options object for configuring the POST request.
     * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
     */
    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    };

    /**
     * Performs a PUT request.
     * @param {string} url - The URL to send the PUT request to.
     * @param {object} options - An options object for configuring the PUT request.
     * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
     */
    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    };

    /**
     * Performs a DELETE request.
     * @param {string} url - The URL to send the DELETE request to.
     * @param {object} options - An options object for configuring the DELETE request.
     * @returns {Promise} A Promise that resolves to the response data or rejects with an error.
     */
    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    return {
        get,
        post,
        put,
        del,
    };
};
