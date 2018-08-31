package com.textmessenger.mapper;

import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.transfer.PostTxDto;
import com.textmessenger.model.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

  PostRxDto postToRxDto(Post post);

  List<PostRxDto> postsToRxDtos(List<Post> posts);

  PostTxDto postToTxDto(Post post);

  List<PostTxDto> postsToTxDtos(List<Post> posts);

  Post postRxDtoToPost(PostRxDto userRxDto);

  List<Post> postRxDtosToPosts(List<PostRxDto> userRxDtos);

  Post postTxDtoToPost(PostTxDto userTxDto);

  List<Post> postTxDtosToPosts(List<PostTxDto> userTxDtos);

}
