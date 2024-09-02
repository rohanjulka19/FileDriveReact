import Cookies from 'js-cookie'

const csrftoken = Cookies.get('csrftoken');
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL 

const FileAPI = {
    async getItems(parent_id) {
        const resp = await fetch(`${apiBaseUrl}/files/items/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken
            },
            credentials: 'include'
          });

        const data = await resp.json()
        return data;
    },

    async getUploadMetadata() {
        const resp = await fetch(`${apiBaseUrl}/files/upload-url`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken
            },
            credentials: 'include'
          });

        const data = await resp.json()
        return data;
    },

    async createItem(itemName, isDir, objectKey, parent, size) {
        const resp = await fetch(`${apiBaseUrl}/files/items/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                "name": itemName,
                "is_dir": isDir,
                "object_key": objectKey,
                "parent": parent,
                "size": size
            }),
            credentials: 'include'
          });

        const data = await resp.json()
        return data;
    },

    async deleteItem(itemId) {
        const resp = await fetch(`${apiBaseUrl}/files/items/${itemId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json", 
              "X-CSRFToken": csrftoken,
            },
            credentials: 'include'
          });

        const data = await resp.json()
        return data;
    }
}


export default FileAPI;