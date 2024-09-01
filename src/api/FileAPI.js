const apiBaseUrl = import.meta.env.VITE_API_BASE_URL 

const FileAPI = {
    async getItems(parent_id) {
        const resp = await fetch(`${apiBaseUrl}/files/items/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
          });
          
        const data = await resp.json()
        return data;
    }
}

export default FileAPI;