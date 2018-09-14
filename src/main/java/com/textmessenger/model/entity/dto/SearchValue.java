package com.textmessenger.model.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
public class SearchValue {
    @NotBlank
    private String search;
}
