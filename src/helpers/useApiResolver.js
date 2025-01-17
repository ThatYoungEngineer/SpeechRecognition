const useAPIResolver = () => {

    const APIRequest = async (endpoint, method = 'GET', headers = {}, body = null) => {

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                'Content-Type': 'application/json', // Default content type
                ...headers, // Allow custom headers
                },
                body: body ? JSON.stringify(body) : null,
            });
            const data = await res.json();

            if (res.ok) {
                return {data, status: res.status, ok: res.ok, isError: false}
            } else {
                return {data, status: res.status, ok: res.ok, isError: false}
            }
        } catch (error) {
            return {data: null, status: 500, ok: false, isError: true}
        }
    }

  return {APIRequest}
};

export default useAPIResolver;