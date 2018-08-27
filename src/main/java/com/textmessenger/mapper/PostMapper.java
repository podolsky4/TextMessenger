package com.textmessenger.mapper;

import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.model.entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {

  PostRxDTO postToRxDto(Post post);

  PostTxDTO postToTxDto(Post post);

  Post postRxDtoToPost(PostRxDTO userRxDTO);

  Post postTxDtoToPost(PostTxDTO userTxDTO);

}
