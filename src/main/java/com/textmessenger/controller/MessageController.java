package com.textmessenger.controller;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;
import com.textmessenger.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("/messages")
public class MessageController {
  private final MessageService messageService;

  MessageController(MessageService messageService) {
    this.messageService = messageService;
  }


  @GetMapping("/dialog/{id}")
  public ResponseEntity<?> getAllMessagesByDialog(@PathVariable("id") Dialog dialog) {
    return Optional.of(ResponseEntity.ok().body(messageService.getMessagesFromDialog(dialog)))
            .orElse(ResponseEntity.noContent().build());
  }

  @PostMapping("dialog/{id}")
  public ResponseEntity<?> addMessageToDialog(@PathVariable("id") Dialog dialog, @RequestBody Message message) {
    message.setDialog(dialog);
    messageService.createMessage(message);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }

  @PutMapping
  public ResponseEntity<?> updateMessageById(@RequestBody Message message) {
    messageService.updateMessage(message);
    return Optional.of(ResponseEntity.ok())
            .orElse(ResponseEntity.badRequest()).build();
  }

  @DeleteMapping
  public ResponseEntity<?> deleteMessageById(@RequestBody Message message) {
    messageService.deleteMessage(message);
    return ResponseEntity.ok().build();
  }
}
