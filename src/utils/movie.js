
const API = import.meta.env.VITE_APP_API_KEY;
export const Movie = () => {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API}`)
        .then(res => res.json()).then(res => {
            return (

                res
            )
        })

}

