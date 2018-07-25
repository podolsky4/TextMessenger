package com.textmessenger.controller;

import com.textmessenger.model.Dialog;
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
  public ResponseEntity.BodyBuilder createDialog(@RequestBody Dialog dialog) {
    dialogService.createDialog(dialog);
    return ResponseEntity.status(200);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Dialog> readDialog(@PathVariable("id") long id) {
    return Optional.of(ResponseEntity.ok().body(dialogService.readDialog(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity.BodyBuilder updateDialog(@PathVariable("id") Dialog oldDialog, @RequestBody Dialog dialog) {
    dialogService.updateDialog(oldDialog, dialog);
    return ResponseEntity.status(200);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity.BodyBuilder deleteDialog(@PathVariable("id") long id) {
    dialogService.deleteDialog(id);
    return ResponseEntity.status(200);
  }
}
