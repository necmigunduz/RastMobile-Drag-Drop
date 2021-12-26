const fetchData = async(url) => {
    let data = {}
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        data = response.json
    } catch (error) {
        data = 'Error'
        console.log(error)
    }
} 

export default fetchData