
export class API {
  static baseUrl = null
  static async getLists() {
    const response = await fetch(`${API.baseUrl}/lists?format=json`)
    return response.json()
  }
  static async createItem(data) {
    const response = await fetch(`${API.baseUrl}/items?format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }
}
