package com.textmessenger.controller;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.service.DialogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dialogs")
public class DialogController {

  private final DialogService dialogService;

  public DialogController(DialogService dialogService) {
    this.dialogService = dialogService;
  }

  @PostMapping("/user/{id}")
  public ResponseEntity createDialog(@PathVariable("id") Long user, @RequestBody User mainUser) {
    dialogService.createdByUserDialogWithUser(mainUser.getLogin(), user);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<?> readDialog(@PathVariable("id") User user) {
    return Optional.of(ResponseEntity.ok().body(dialogService.getDialogsByUser(user)))
            .orElse(ResponseEntity.noContent().build());
  }

  @PutMapping
  public ResponseEntity updateDialog(@RequestBody Dialog dialog) {
    dialogService.updateDialog(dialog);
    return Optional.of(ResponseEntity.status(200)).orElse(ResponseEntity.unprocessableEntity()).build();
  }

}
