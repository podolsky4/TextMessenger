package com.textmessenger.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/twitter")
public class FrontEndController {
    @GetMapping
    public String trueIndex() {
        return "forward:/twitter/index.html";
    }

    @GetMapping("**/{subpath:[^\\.]+}")
    public String fakeIndex() {
        return "forward:/twitter/index.html";
    }
}

