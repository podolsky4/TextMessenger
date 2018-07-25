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

import java.util.List;
import java.util.Optional;

@RestController("/messages")
public class MessageController {
  private final MessageService messageService;

  MessageController (MessageService messageService){
    this.messageService=messageService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Message>> getMessageById(@PathVariable("id") long id){
    return ResponseEntity.ok().body(Optional.ofNullable(messageService.readMessage(id)));
  }

  @GetMapping("/dialog/{id}")
  public ResponseEntity<Optional<List<Message>>> getAllMessagesByDialog(@PathVariable("id")Dialog dialog){
    return ResponseEntity.ok().body(Optional.ofNullable(messageService.getMessagesFromDialog(dialog)));
  }

  @PostMapping("/{id]")
  public void addMessageToDialog(@PathVariable("id") Dialog dialog, @RequestBody Message message){
    message.setDialog(dialog);
    messageService.createMessage(message);
  }

  @PutMapping("/{id}")
  public void updateMessageById(@PathVariable("id") long id , @RequestBody Message message){
    messageService.updateMessage(id,message);
  }
  @DeleteMapping("/{id}")
  public void deleteMessageById(@PathVariable("id") long id){
    messageService.deleteMessage(id);
  }
}
