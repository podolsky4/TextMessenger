package com.textmessenger.controller;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.User;
import com.textmessenger.service.DialogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/dialogs")
public class DialogController {

  private final DialogService dialogService;

  public DialogController(DialogService dialogService) {
    this.dialogService = dialogService;
  }

  @PostMapping
  public ResponseEntity createDialog(@RequestBody Dialog dialog) {
    dialogService.createDialog(dialog);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @GetMapping("user/{id}")
  public ResponseEntity<?> readDialog(@PathVariable("id") User user) {
    return Optional.of(ResponseEntity.ok().body(dialogService.getDialogsByUser(user)))
            .orElse(ResponseEntity.noContent().build());
  }

  @PutMapping
  public ResponseEntity updateDialog(@RequestBody Dialog dialog) {
    dialogService.updateDialog(dialog);
    return Optional.of(ResponseEntity.status(200)).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteDialog(@PathVariable("id") long id) {
    dialogService.deleteDialog(id);
    return Optional.of(ResponseEntity.status(200)).orElse(ResponseEntity.unprocessableEntity()).build();
  }
}
