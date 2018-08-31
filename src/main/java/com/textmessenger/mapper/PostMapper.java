package com.textmessenger.mapper;

import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.model.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

  PostRxDTO postToRxDto(Post post);

  List<PostRxDTO> postsToRxDtos(List<Post> posts);

  PostTxDTO postToTxDto(Post post);

  List<PostTxDTO> postsToTxDtos(List<Post> posts);

  Post postRxDtoToPost(PostRxDTO userRxDto);

  List<Post> postRxDtosToPosts(List<PostRxDTO> userRxDtos);

  Post postTxDtoToPost(PostTxDTO userTxDto);

  List<Post> postTxDtosToPosts(List<PostTxDTO> userTxDtos);

}
