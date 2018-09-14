package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class Token {
    private String accessToken;//NOSONAR
    private static final String TOKEN_TYPE = "Bearer"; //NOSONAR

    public Token(String accessToken) {
        this.accessToken = accessToken;
    }
}
