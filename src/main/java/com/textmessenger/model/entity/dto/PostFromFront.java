package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Post;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PostFromFront {
    @NotBlank
    private String content;

    public static Post convertPostFromFrontToPost(PostFromFront postFromFront) {
        Post post = new Post();
        post.setContent(postFromFront.getContent());
        return post;
    }
}
