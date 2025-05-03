import axios from "axios";

export async function getallPostsService(){
    try{
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return posts.data
    } catch (error){
        console.log(`Error fetching posts, ${error}`)
        throw new Error(`Error: ${error}`)
    }
}

export async function getSinglePostService(id: number){
    try {
       const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`) ;
       return post.data
    } catch (error){
        console.log(`Error fetching posts, ${error}`)
        throw new Error(`Error: ${error}`)
    }
}