import { useQuery } from "@tanstack/react-query";
import { getallPostsService, getSinglePostService } from "../service/postsService";




export function GetAllPost() {
    const posts = useQuery({
        queryKey: ['allposts'],
        queryFn: getallPostsService
    });
    return posts;
}

export function GetSinglePost(id: number): ReturnType<typeof useQuery> {
    const singlePost = useQuery({
        queryKey: ['singlepost', id],
        queryFn: () => getSinglePostService(id)
    });

    return singlePost;
}